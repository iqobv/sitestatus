import { RegionDto } from '@api/public/region/dto/region.dto';
import { UserRole } from '@generated/postgres/enums';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminRegionService } from './admin-region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Auth(UserRole.ADMIN)
@ApiTags('Admin Regions')
@Controller('admin/regions')
export class AdminRegionController {
	constructor(private readonly adminRegionService: AdminRegionService) {}

	@ApiOperation({
		summary: 'Create a new region',
		description: 'Creates a new region with the provided details',
	})
	@ApiErrorResponse(HttpStatus.CONFLICT, ERROR_MESSAGES.REGION.ALREADY_EXISTS)
	@ApiOkResponse({ type: RegionDto })
	@Post()
	public async createRegion(@Body() dto: CreateRegionDto): Promise<RegionDto> {
		return await this.adminRegionService.createRegion(dto);
	}

	@ApiOperation({
		summary: 'Get region by key',
		description: 'Retrieves a region by its unique key',
	})
	@ApiOkResponse({ type: RegionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.REGION.NOT_FOUND)
	@Get('key/:key')
	public async getRegionByKey(@Param('key') key: string): Promise<RegionDto> {
		return await this.adminRegionService.getRegionByKey(key);
	}

	@ApiOperation({
		summary: 'Get region by ID',
		description: 'Retrieves a region by its unique ID',
	})
	@ApiOkResponse({ type: RegionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.REGION.NOT_FOUND)
	@Get('id/:id')
	public async getRegionById(
		@Param('id', ParseUUIDPipe) id: string,
	): Promise<RegionDto> {
		return await this.adminRegionService.getRegionById(id);
	}

	@ApiOperation({
		summary: 'Update region by ID',
		description: 'Updates a region by its unique ID',
	})
	@ApiOkResponse({ type: RegionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.REGION.NOT_FOUND)
	@ApiErrorResponse(HttpStatus.CONFLICT, ERROR_MESSAGES.REGION.ALREADY_EXISTS)
	@Patch(':id')
	public async updateRegion(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: UpdateRegionDto,
	): Promise<RegionDto> {
		return await this.adminRegionService.updateRegion(id, dto);
	}

	@ApiOperation({
		summary: 'Delete region by ID',
		description: 'Deletes a region by its unique ID',
	})
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.REGION.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.REGION.NOT_FOUND)
	@Delete(':id')
	public async deleteRegion(
		@Param('id', ParseUUIDPipe) id: string,
	): Promise<MessageResponse> {
		return await this.adminRegionService.deleteRegion(id);
	}
}
