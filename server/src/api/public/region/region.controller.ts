import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RegionDto } from './dto';
import { RegionService } from './region.service';

@Controller('regions')
export class RegionController {
	constructor(private readonly regionService: RegionService) {}

	@ApiOperation({ summary: 'Get all active regions' })
	@ApiOkResponse({ type: [RegionDto] })
	@Get()
	async getAllActiveRegions() {
		return await this.regionService.getAllActiveRegions();
	}
}
