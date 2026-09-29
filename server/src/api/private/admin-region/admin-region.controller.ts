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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AdminRegionService } from './admin-region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Auth(UserRole.ADMIN)
@ApiTags('Admin Regions')
@Controller('admin/regions')
export class AdminRegionController {
	constructor(private readonly adminRegionService: AdminRegionService) {}

	/** Create a new region */
	@Post()
	@ApiErrorResponse(HttpStatus.CONFLICT, ERROR_MESSAGES.REGION.ALREADY_EXISTS)
	@ApiOkResponse({ type: RegionDto })
	public async createRegion(@Body() dto: CreateRegionDto): Promise<RegionDto> {
		return await this.adminRegionService.createRegion(dto);
	}

	/** Get region by key */
	@Get('key/:key')
	@ApiOkResponse({ type: RegionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.REGION.NOT_FOUND)
	public async getRegionByKey(@Param('key') key: string): Promise<RegionDto> {
		return await this.adminRegionService.getRegionByKey(key);
	}

	/** Get region by ID */
	@Get('id/:id')
	@ApiOkResponse({ type: RegionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.REGION.NOT_FOUND)
	public async getRegionById(
		@Param('id', ParseUUIDPipe) id: string,
	): Promise<RegionDto> {
		return await this.adminRegionService.getRegionById(id);
	}

	/** Update region by ID */
	@Patch(':id')
	@ApiOkResponse({ type: RegionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.REGION.NOT_FOUND)
	@ApiErrorResponse(HttpStatus.CONFLICT, ERROR_MESSAGES.REGION.ALREADY_EXISTS)
	public async updateRegion(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: UpdateRegionDto,
	): Promise<RegionDto> {
		return await this.adminRegionService.updateRegion(id, dto);
	}

	/** Delete region by ID */
	@Delete(':id')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.REGION.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.REGION.NOT_FOUND)
	public async deleteRegion(
		@Param('id', ParseUUIDPipe) id: string,
	): Promise<MessageResponse> {
		return await this.adminRegionService.deleteRegion(id);
	}
}
