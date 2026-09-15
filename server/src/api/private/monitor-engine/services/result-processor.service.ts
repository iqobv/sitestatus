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
import { PingResultDto } from '../dto/ping-result.dto';
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

	public onModuleInit(): void {
		this.initializeReceiver();
		this.isRunning = true;
		this.processBatchesContinuously().catch((error: unknown) => {
			this.logger.error('Fatal error in background processor', error);
		});
	}

	public async onModuleDestroy(): Promise<void> {
		this.isRunning = false;
		if (this.receiver) await this.receiver.close();
	}

	private initializeReceiver(): void {
		if (this.receiver) this.receiver.close().catch(() => {});

		this.receiver = this.sbClient.createReceiver('monitor-results');
	}

	private async processBatchesContinuously(): Promise<void> {
		while (this.isRunning) {
			if (!this.receiver) this.initializeReceiver();

			let messages: ServiceBusReceivedMessage[] = [];

			try {
				messages = await this.receiver!.receiveMessages(50, {
					maxWaitTimeInMs: 5000,
				});

				if (messages.length === 0) continue;

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

				const typedError = error as { code?: string; errno?: number | string };
				if (
					typedError.code === 'GeneralError' ||
					typedError.errno === 'ECONNRESET' ||
					typedError.errno === -104
				) {
					this.logger.warn('Connection reset detected, recreating receiver');
					this.initializeReceiver();
				}

				await this.delay(5000);
			}
		}
	}

	private delay(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
