import { Module } from '@nestjs/common';
import { AdminRegionModule } from '../admin-region/admin-region.module';
import { InternalPingController } from './internal-ping.controller';
import { InternalPingService } from './internal-ping.service';

@Module({
	controllers: [InternalPingController],
	imports: [AdminRegionModule],
	providers: [InternalPingService],
})
export class InternalPingModule {}
