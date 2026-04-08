import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { RegionDto } from 'src/api/public/region/dto';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'src/libs/constants';
import { Auth } from 'src/libs/decorators';
import { createCustomMessageDto } from 'src/libs/utils';
import { AdminRegionService } from './admin-region.service';
import { CreateRegionDto, UpdateRegionDto } from './dto';

@ApiTags('Admin Regions')
@Controller('admin/regions')
export class AdminRegionController {
	constructor(private readonly adminRegionService: AdminRegionService) {}

	@Auth('ADMIN')
	@ApiOperation({
		summary: 'Create a new region',
		description: 'Creates a new region with the provided details',
	})
	@ApiConflictResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.REGION.REGION_ALREADY_EXISTS),
	})
	@ApiOkResponse({ type: RegionDto })
	@Post()
	async createRegion(@Body() dto: CreateRegionDto) {
		return await this.adminRegionService.createRegion(dto);
	}

	@Auth('ADMIN')
	@ApiOperation({
		summary: 'Get region by key',
		description: 'Retrieves a region by its unique key',
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.REGION.REGION_NOT_FOUND),
	})
	@ApiOkResponse({ type: RegionDto })
	@Get('key/:key')
	async getRegionByKey(@Param('key') key: string) {
		return await this.adminRegionService.getRegionByKey(key);
	}

	@Auth('ADMIN')
	@ApiOperation({
		summary: 'Get region by ID',
		description: 'Retrieves a region by its unique ID',
	})
	@ApiOkResponse({ type: RegionDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.REGION.REGION_NOT_FOUND),
	})
	@Get('id/:id')
	async getRegionById(@Param('id') id: string) {
		return await this.adminRegionService.getRegionById(id);
	}

	@Auth('ADMIN')
	@ApiOperation({
		summary: 'Update region by ID',
		description: 'Updates a region by its unique ID',
	})
	@ApiOkResponse({ type: RegionDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.REGION.REGION_NOT_FOUND),
	})
	@ApiConflictResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.REGION.REGION_ALREADY_EXISTS),
	})
	@Patch(':id')
	async updateRegion(@Param('id') id: string, @Body() dto: UpdateRegionDto) {
		return await this.adminRegionService.updateRegion(id, dto);
	}

	@Auth('ADMIN')
	@ApiOperation({
		summary: 'Delete region by ID',
		description: 'Deletes a region by its unique ID',
	})
	@ApiOkResponse({
		type: createCustomMessageDto(SUCCESS_MESSAGES.REGION.REGION_DELETED),
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.REGION.REGION_NOT_FOUND),
	})
	@Delete(':id')
	async deleteRegion(@Param('id') id: string) {
		return await this.adminRegionService.deleteRegion(id);
	}
}
