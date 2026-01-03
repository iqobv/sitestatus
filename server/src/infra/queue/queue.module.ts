import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IS_DEV_ENV } from 'src/libs/utils';

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
					...(IS_DEV_ENV
						? {}
						: {
								tls: {},
							}),
					family: 4,
					commandTimeout: 30000,
					maxRetriesPerRequest: null,
				},
			}),
			inject: [ConfigService],
		}),
	],
	exports: [BullModule],
})
export class QueueModule {}
