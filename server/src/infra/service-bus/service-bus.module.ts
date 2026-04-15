import { ServiceBusClient } from '@azure/service-bus';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: ServiceBusClient,
			useFactory: (configService: ConfigService) => {
				const connectionString = configService.getOrThrow<string>(
					'SERVICE_BUS_CONNECTION_STRING',
				);
				return new ServiceBusClient(connectionString);
			},
			inject: [ConfigService],
		},
	],
	exports: [ServiceBusClient],
})
export class ServiceBusModule {}
