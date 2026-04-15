import { Module } from '@nestjs/common';
import { AdminRegionController } from './admin-region.controller';
import { AdminRegionService } from './admin-region.service';

@Module({
	controllers: [AdminRegionController],
	providers: [AdminRegionService],
	exports: [AdminRegionService],
})
export class AdminRegionModule {}
