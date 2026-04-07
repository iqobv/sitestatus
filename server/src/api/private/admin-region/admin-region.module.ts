import { Module } from '@nestjs/common';
import { AdminRegionService } from './admin-region.service';
import { AdminRegionController } from './admin-region.controller';

@Module({
	controllers: [AdminRegionController],
	providers: [AdminRegionService],
})
export class AdminRegionModule {}
