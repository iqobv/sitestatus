import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
	imports: [
		BullModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				connection: {
					host: configService.get<string>('REDIS_HOST'),
					port: configService.get<number>('REDIS_PORT'),
					username: configService.get<string>('REDIS_USER'),
					password: configService.get<string>('REDIS_PASSWORD'),
					maxRetriesPerRequest: null,
				},
			}),
			inject: [ConfigService],
		}),
	],
	exports: [BullModule],
})
export class QueueModule {}
