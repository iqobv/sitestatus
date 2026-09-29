import { IsPublic } from '@libs/decorators/is-public.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegionDto } from './dto/region.dto';
import { RegionService } from './region.service';

@IsPublic()
@ApiTags('Regions')
@Controller('regions')
export class RegionController {
	constructor(private readonly regionService: RegionService) {}

	/** Get all active regions */
	@Get()
	@ApiOkResponse({ type: [RegionDto] })
	public async getAllActiveRegions(): Promise<RegionDto[]> {
		return await this.regionService.getAllActiveRegions();
	}
}
