import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { MonitorModule } from './monitor/monitor.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { PingResultModule } from './ping-result/ping-result.module';
import { TokenModule } from './token/token.module';
import { UserProviderModule } from './user-provider/user-provider.module';
import { UserModule } from './user/user.module';
import { InfraModule } from 'src/infra/infra.module';

@Module({
	imports: [
		ScheduleModule.forRoot(),
		InfraModule,
		UserModule,
		UserProviderModule,
		AuthModule,
		TokenModule,
		PingResultModule,
		MonitorModule,
		MonitoringModule,
	],
})
export class ApiModule {}
