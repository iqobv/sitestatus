import {
	ServiceBusClient,
	ServiceBusReceivedMessage,
	ServiceBusReceiver,
} from '@azure/service-bus';
import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { PingResultDto } from '../dto';
import { EngineDbService } from './engine-db.service';

@Injectable()
export class ResultProcessorService implements OnModuleInit, OnModuleDestroy {
	private receiver: ServiceBusReceiver | null = null;
	private isRunning = false;
	private readonly logger = new Logger(ResultProcessorService.name);

	constructor(
		private readonly sbClient: ServiceBusClient,
		private readonly engineDbService: EngineDbService,
	) {}

	public onModuleInit() {
		this.receiver = this.sbClient.createReceiver('monitor-results');
		this.isRunning = true;
		this.processBatchesContinuously().catch((error: unknown) => {
			this.logger.error('Fatal error in background processor', error);
		});
	}

	public async onModuleDestroy() {
		this.isRunning = false;
		if (this.receiver) {
			await this.receiver.close();
		}
	}

	private async processBatchesContinuously() {
		while (this.isRunning && this.receiver) {
			let messages: ServiceBusReceivedMessage[] = [];

			try {
				messages = await this.receiver.receiveMessages(50, {
					maxWaitTimeInMs: 5000,
				});

				if (messages.length === 0) {
					continue;
				}

				const payloads: PingResultDto[] = messages.map(
					(m) => m.body as PingResultDto,
				);

				await this.engineDbService.saveBatchResults(payloads);

				await Promise.all(
					messages.map((m) => this.receiver!.completeMessage(m)),
				);
			} catch (error: unknown) {
				this.logger.error('Failed to process batch', error);

				if (messages.length > 0 && this.receiver) {
					const abandonPromises = messages.map((m) =>
						this.receiver!.abandonMessage(m).catch((e: unknown) =>
							this.logger.error('Failed to abandon message', e),
						),
					);
					await Promise.allSettled(abandonPromises);
				}

				await this.delay(5000);
			}
		}
	}

	private delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
