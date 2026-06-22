import { IsPublic } from '@libs/decorators/is-public.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegionDto } from './dto/region.dto';
import { RegionService } from './region.service';

@IsPublic()
@ApiTags('Regions')
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
