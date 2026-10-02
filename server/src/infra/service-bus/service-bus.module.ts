import { ServiceBusClient } from '@azure/service-bus';
import { EnvService } from '@infra/env/env.service';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: ServiceBusClient,
			inject: [EnvService],
			useFactory: (envService: EnvService) => {
				const connectionString = envService.get(
					'SERVICE_BUS_CONNECTION_STRING',
				);
				return new ServiceBusClient(connectionString);
			},
		},
	],
	exports: [ServiceBusClient],
})
export class ServiceBusModule {}
