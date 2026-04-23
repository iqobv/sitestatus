import { ApiModule } from '@api/api.module';
import { InfraModule } from '@infra/infra.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ThrottlerModule.forRoot([
			{ name: 'short', ttl: 1000, limit: 3 },
			{ name: 'default', ttl: 60000, limit: 100 },
			{ name: 'strict', ttl: 60000, limit: 5 },
		]),
		EventEmitterModule.forRoot(),
		InfraModule,
		ApiModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
