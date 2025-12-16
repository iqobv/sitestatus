import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';

export const REDIS_PROVIDER = {
	REDIS_CLIENT: 'REDIS_CLIENT',
	REDIS_STORE: 'REDIS_STORE',
} as const;

@Global()
@Module({
	providers: [
		{
			provide: REDIS_PROVIDER.REDIS_CLIENT,
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => {
				const client = createClient({
					url: config.getOrThrow<string>('REDIS_URI'),
				});
				await client.connect();
				return client;
			},
		},
		{
			provide: REDIS_PROVIDER.REDIS_STORE,
			inject: [REDIS_PROVIDER.REDIS_CLIENT],
			useFactory: (client: ReturnType<typeof createClient>): RedisStore => {
				return new RedisStore({ client });
			},
		},
	],
	exports: [REDIS_PROVIDER.REDIS_CLIENT, REDIS_PROVIDER.REDIS_STORE],
})
export class RedisModule {}
