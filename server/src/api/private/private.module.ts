import { Module } from '@nestjs/common';
import { InternalPingModule } from './internal-ping/internal-ping.module';
import { AdminRegionModule } from './admin-region/admin-region.module';

@Module({
	imports: [InternalPingModule, AdminRegionModule],
})
export class PrivateModule {}
