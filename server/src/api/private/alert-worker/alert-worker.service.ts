import { AlertSettingsService } from '@api/public/alert-settings/alert-settings.service';
import { PersonalNotificationService } from '@api/public/notification/services';
import {
	ProcessErrorArgs,
	ServiceBusClient,
	ServiceBusReceivedMessage,
	ServiceBusReceiver,
	ServiceBusSender,
} from '@azure/service-bus';
import { ChannelType, NotificationChannel } from '@generated/postgres/client';
import { SiteStatus } from '@generated/turso/enums';
import { IncidentAlertDto, RegionInfoDto } from '@infra/mail/dto';
import { MailService } from '@infra/mail/mail.service';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { IncedentPayloadDto } from '../monitor-engine/dto';
import { MonitorCacheService } from '../monitor-engine/services/monitor-cache.service';

@Injectable()
export class AlertWorkerService implements OnModuleInit, OnModuleDestroy {
	private receiver: ServiceBusReceiver | null = null;
	private sender: ServiceBusSender | null = null;
	private readonly logger: Logger = new Logger(AlertWorkerService.name);

	constructor(
		private readonly sbClient: ServiceBusClient,
		private readonly alertSettingsService: AlertSettingsService,
		private readonly mailService: MailService,
		private readonly tursoPrismaService: TursoPrismaService,
		private readonly pgPrismaService: PgPrismaService,
		private readonly cache: MonitorCacheService,
		private readonly personalNotificationService: PersonalNotificationService,
	) {}

	public onModuleInit() {
		const queueName = 'incidents';
		this.receiver = this.sbClient.createReceiver(queueName);
		this.sender = this.sbClient.createSender(queueName);
		this.receiveMessages();
	}

	public async onModuleDestroy() {
		if (this.receiver) {
			await this.receiver.close();
		}
		if (this.sender) {
			await this.sender.close();
		}
	}

	private receiveMessages() {
		if (!this.receiver) return;

		this.receiver.subscribe(
			{
				processMessage: async (message: ServiceBusReceivedMessage) => {
					try {
						await this.proccessIncident(message.body as IncedentPayloadDto);
						await this.receiver?.completeMessage(message);
					} catch (error: unknown) {
						const messageId =
							message.messageId !== undefined
								? message.messageId.toString()
								: 'unknown';

						this.logger.error(
							`Error processing message with id ${messageId}`,
							error instanceof Error ? error.stack : error,
						);
						await this.receiver?.abandonMessage(message);
					}
				},
				// eslint-disable-next-line @typescript-eslint/require-await
				processError: async (args: ProcessErrorArgs) => {
					this.logger.error(
						`Service Bus Error in ${args.errorSource}:`,
						args.error,
					);
				},
			},
			{
				autoCompleteMessages: false,
				maxConcurrentCalls: 10,
			},
		);
	}

	private async proccessIncident(body: IncedentPayloadDto) {
		const incident = await this.tursoPrismaService.monitorIncident.findUnique({
			where: { id: body.incidentId },
		});

		if (!incident) return;

		const monitor = await this.pgPrismaService.monitor.findUnique({
			where: { id: body.monitorId },
		});

		if (!monitor) return;

		const settings = await this.alertSettingsService.getEffectiveSettings(
			body.monitorId,
		);

		if (!settings || !settings.isEnabled || settings.channels.length === 0)
			return;

		const allActiveIncidents =
			await this.tursoPrismaService.monitorIncident.findMany({
				where: { monitorId: body.monitorId, resolved: false },
			});

		const uniqueRegionsMap = new Map<string, RegionInfoDto>();

		for (const activeIncident of allActiveIncidents) {
			const region = this.cache.getRegionById(activeIncident.regionId);
			if (region && !uniqueRegionsMap.has(region.id)) {
				uniqueRegionsMap.set(region.id, { id: region.id, name: region.name });
			}
		}

		const regions: RegionInfoDto[] = Array.from(uniqueRegionsMap.values());

		const alertBody: IncidentAlertDto = {
			monitorName: monitor.name,
			monitorId: body.monitorId,
			regionId: body.regionId,
			incidentId: body.incidentId,
			status: body.type,
			createdAt: incident.createdAt,
			errorMessage: incident.errorMessage,
			statusCode: incident.statusCode,
			resolvedAt: incident.resolved ? incident.resolvedAt : null,
			regions,
		};

		if (body.type === SiteStatus.DOWN) {
			if (incident.resolved) return;
			if (!settings.onDown) return;

			const delayMs = settings.delay * 60 * 1000;
			const triggerTime = new Date(incident.createdAt.getTime() + delayMs);
			const now = new Date();

			if (now < triggerTime) {
				if (this.sender) {
					await this.sender.sendMessages({
						body,
						contentType: 'application/json',
						scheduledEnqueueTimeUtc: triggerTime,
					});
				}
				return;
			}

			const isAlreadyAlerting = allActiveIncidents.some(
				(i) => i.alertTriggered,
			);

			if (isAlreadyAlerting) {
				await this.tursoPrismaService.monitorIncident.update({
					where: { id: incident.id },
					data: { alertSentAt: new Date(), alertTriggered: true },
				});
				return;
			}

			const claimResult =
				await this.tursoPrismaService.monitorIncident.updateMany({
					where: {
						monitorId: body.monitorId,
						resolved: false,
						alertTriggered: false,
					},
					data: {
						alertTriggered: true,
						alertSentAt: new Date(),
					},
				});

			if (claimResult.count === 0) return;

			await this.personalNotificationService.createPersonalNotification({
				title: `Incident detected for monitor ${monitor.name}`,
				message: `An incident has been detected for your monitor "${monitor.name}" in regions "${regions.map((r) => r.name).join(', ')}". Click to view details.`,
				userId: monitor.userId,
				isAppNotification: true,
				actionUrl: `/monitors/${monitor.id}/incidents/${incident.id}`,
				type: 'INCIDENT',
			});

			for (const channel of settings.channels) {
				await this.sendAlert(channel, alertBody);
			}
		}

		if (body.type === SiteStatus.UP) {
			if (!settings.onUp) return;
			if (!incident.alertTriggered) return;

			if (allActiveIncidents.length > 0) return;

			const tieBreaker =
				await this.tursoPrismaService.monitorIncident.findFirst({
					where: {
						monitorId: body.monitorId,
						resolved: true,
						alertTriggered: true,
					},
					orderBy: [{ resolvedAt: 'desc' }, { id: 'asc' }],
				});

			if (tieBreaker && tieBreaker.id !== body.incidentId) return;

			await this.personalNotificationService.createPersonalNotification({
				title: `Incident resolved for monitor ${monitor.name}`,
				message: `An incident has been resolved for your monitor "${monitor.name}". Click to view incident details.`,
				userId: monitor.userId,
				isAppNotification: true,
				actionUrl: `/monitors/${monitor.id}/incidents/${incident.id}`,
				type: 'RESOLVED',
			});

			for (const channel of settings.channels) {
				await this.sendAlert(channel, alertBody);
			}
		}
	}

	private async sendAlert(
		channel: NotificationChannel,
		incident: IncidentAlertDto,
	) {
		if (channel.type === ChannelType.EMAIL) {
			await this.mailService.sendIncidentAlert(channel.value, incident);
		}
	}
}
