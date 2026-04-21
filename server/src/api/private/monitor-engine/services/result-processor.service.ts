import { ServiceBusClient, ServiceBusReceiver } from '@azure/service-bus';
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

	public onModuleInit(): void {
		this.receiver = this.sbClient.createReceiver('monitor-results');
		this.isRunning = true;
		this.processBatchesContinuously().catch((error: unknown) => {
			this.logger.error('Fatal error in background processor', error);
		});
	}

	public async onModuleDestroy(): Promise<void> {
		this.isRunning = false;
		if (this.receiver) {
			await this.receiver.close();
		}
	}

	private async processBatchesContinuously(): Promise<void> {
		while (this.isRunning && this.receiver) {
			try {
				const messages = await this.receiver.receiveMessages(50, {
					maxWaitTimeInMs: 5000,
				});

				if (messages.length === 0) {
					continue;
				}

				const payloads: PingResultDto[] = messages.map(
					(m) => m.body as PingResultDto,
				);

				await this.engineDbService.saveBatchResults(payloads);

				const completePromises = messages.map((m) => {
					if (this.receiver) {
						return this.receiver.completeMessage(m);
					}
					return Promise.resolve();
				});

				await Promise.all(completePromises);
			} catch (error: unknown) {
				if (error instanceof Error) {
					this.logger.error(`Failed to process batch: ${error.message}`);
				} else {
					this.logger.error(
						'Failed to process batch with unknown error',
						error,
					);
				}

				await this.delay(5000);
			}
		}
	}

	private delay(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
