import {
	ServiceBusClient,
	ServiceBusMessage,
	ServiceBusSender,
} from '@azure/service-bus';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { MonitorCacheService } from './monitor-cache.service';

@Injectable()
export class TaskDispatcherService implements OnModuleDestroy {
	private readonly senders: Map<string, ServiceBusSender> = new Map();
	private readonly logger: Logger;

	constructor(
		private readonly sbClient: ServiceBusClient,
		private readonly prismaService: TursoPrismaService,
		private readonly monitorCache: MonitorCacheService,
	) {}

	public async onModuleDestroy(): Promise<void> {
		const closePromises: Promise<void>[] = [];
		for (const sender of this.senders.values()) {
			closePromises.push(sender.close());
		}
		await Promise.all(closePromises);
	}

	private getSender(regionKey: string): ServiceBusSender {
		if (!this.senders.has(regionKey)) {
			const queueName = `tasks-${regionKey}`;
			const newSender = this.sbClient.createSender(queueName);
			this.senders.set(regionKey, newSender);
		}

		const sender = this.senders.get(regionKey);

		if (!sender) {
			throw new Error(
				`Failed to retrieve ServiceBusSender for queue: tasks-${regionKey}`,
			);
		}

		return sender;
	}

	private async dispatchTasks() {
		const now = new Date();

		const monitors = this.monitorCache.getMonitors();

		const dispatchPromises: Promise<void>[] = [];

		const monitorStatesToUpdate: {
			monitorId: string;
			nextCheckAt: number;
		}[] = [];

		for (const monitor of monitors) {
			if (now.getTime() >= monitor.nextCheckAt) {
				const nextRun = now.getTime() + monitor.checkIntervalSeconds * 1000;
				this.monitorCache.updateMonitorNextCheck(monitor.id, nextRun);

				for (const regionId of monitor.regionIds) {
					const region = this.monitorCache.getRegionById(regionId);

					if (!region) continue;

					const sender = this.getSender(region.key);

					const payload = {
						monitorId: monitor.id,
						url: monitor.url,
					};

					const message: ServiceBusMessage = {
						body: payload,
						contentType: 'application/json',
					};

					dispatchPromises.push(sender.sendMessages(message));
				}

				monitorStatesToUpdate.push({
					monitorId: monitor.id,
					nextCheckAt: nextRun,
				});
			}
		}

		if (monitorStatesToUpdate.length > 0) {
			this.persistMonitorStates(monitorStatesToUpdate);
		}

		await Promise.all(dispatchPromises);
	}

	private persistMonitorStates(
		updates: { monitorId: string; nextCheckAt: number }[],
	): void {
		const transactions = updates.map((update) =>
			this.prismaService.monitorState.upsert({
				where: { monitorId: update.monitorId },
				update: { nextCheckAt: new Date(update.nextCheckAt) },
				create: {
					monitorId: update.monitorId,
					nextCheckAt: new Date(update.nextCheckAt),
				},
			}),
		);

		this.prismaService.$transaction(transactions).catch((error: Error) => {
			this.logger.error(`Failed to persist monitor states: ${error.message}`);
		});
	}

	@Interval(10000)
	async handleDispatchTasks() {
		await this.dispatchTasks();
	}
}
