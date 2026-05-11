import { Module } from '@nestjs/common';
import { AnalyticsModule } from './analytics/analytics.module';
import { AuthModule } from './auth/auth.module';
import { MonitorModule } from './monitor/monitor.module';
import { ProjectModule } from './project/project.module';
import { RegionModule } from './region/region.module';
import { SessionModule } from './session/session.module';
import { TokenModule } from './token/token.module';
import { UserProviderModule } from './user-provider/user-provider.module';
import { UserModule } from './user/user.module';
import { NotificationChannelModule } from './notification-channel/notification-channel.module';
import { AlertSettingsModule } from './alert-settings/alert-settings.module';
import { IncidentModule } from './incident/incident.module';
import { StatusPageModule } from './status-page/status-page.module';
import { NotificationModule } from './notification/notification.module';

@Module({
	imports: [
		UserModule,
		UserProviderModule,
		AuthModule,
		TokenModule,
		MonitorModule,
		ProjectModule,
		RegionModule,
		AnalyticsModule,
		SessionModule,
		NotificationChannelModule,
		AlertSettingsModule,
		IncidentModule,
		StatusPageModule,
		NotificationModule,
	],
})
export class PublicModule {}
