import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MonitorModule } from './monitor/monitor.module';
import { ProjectModule } from './project/project.module';
import { TokenModule } from './token/token.module';
import { UserProviderModule } from './user-provider/user-provider.module';
import { UserModule } from './user/user.module';
import { RegionModule } from './region/region.module';

@Module({
	imports: [
		UserModule,
		UserProviderModule,
		AuthModule,
		TokenModule,
		MonitorModule,
		ProjectModule,
		RegionModule,
	],
})
export class PublicModule {}
