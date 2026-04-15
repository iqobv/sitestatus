import {
	ServiceBusClient,
	ServiceBusMessage,
	ServiceBusSender,
} from '@azure/service-bus';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class TaskDispatcherService implements OnModuleDestroy {
	private readonly senders: Map<string, ServiceBusSender> = new Map();

	constructor(
		private readonly sbClient: ServiceBusClient,
		private readonly prismaService: PrismaService,
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

		const monitors = await this.prismaService.monitor.findMany({
			where: { isActive: true },
			include: {
				regionConfigs: {
					where: { nextCheckAt: { lte: now }, isQueued: false, isActive: true },
					include: { region: true },
				},
			},
		});

		const dispatchPromises: Promise<void>[] = [];

		for (const monitor of monitors) {
			for (const config of monitor.regionConfigs) {
				const sender = this.getSender(config.region.key);

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
		}

		await this.prismaService.monitorRegion.updateMany({
			where: { nextCheckAt: { lte: now }, isQueued: false },
			data: { isQueued: true },
		});

		await Promise.all(dispatchPromises);
	}

	@Interval(10000)
	async handleDispatchTasks() {
		await this.dispatchTasks();
	}
}
