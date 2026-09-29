import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { IsPublic } from '@libs/decorators/is-public.decorator';
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
	Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import {
	BaseMonitorDto,
	BaseMonitorWithRegionsIdsDto,
	MonitorWithRegionsDto,
	MonitorWithRegionsIdsDto,
} from './dto/monitor.dto';
import { QueryMonitorsDto } from './dto/monitors-query.dto';
import { PaginatedMonitorsDto } from './dto/paginated-monitors.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';
import { MonitorService } from './services/monitor.service';

@IsPublic()
@Controller('monitors')
export class MonitorController {
	constructor(private readonly monitorService: MonitorService) {}

	/** Create a new monitor */
	@Auth()
	@ApiCreatedResponse({ type: BaseMonitorDto })
	@Post('create')
	public async create(
		@Authorized('id') userId: string,
		@Body() dto: CreateMonitorDto,
	): Promise<BaseMonitorDto> {
		return await this.monitorService.create(userId, dto);
	}

	/** Get all monitors */
	@Auth()
	@ApiOkResponse({ type: PaginatedMonitorsDto })
	@Get()
	public async findAll(
		@Authorized('id') userId: string,
		@Query() query: QueryMonitorsDto,
	): Promise<PaginatedMonitorsDto> {
		return await this.monitorService.findAll(userId, query);
	}

	/** Get all monitors by project ID */
	@Auth()
	@ApiOkResponse({ type: PaginatedMonitorsDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PROJECT.NOT_FOUND)
	@Get('projects/:projectId')
	public async findAllMonitorsByProjectId(
		@Authorized('id') userId: string,
		@Param('projectId', ParseUUIDPipe) projectId: string,
		@Query() query: QueryMonitorsDto,
	): Promise<PaginatedMonitorsDto> {
		return await this.monitorService.findAll(userId, query, projectId);
	}

	/** Get a monitor by ID with regions */
	@Auth()
	@ApiOkResponse({ type: MonitorWithRegionsDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.MONITOR.NOT_FOUND)
	@Get('id/:id/full')
	public async findByIdFull(
		@Authorized('id') userId: string,
		@Param('id', ParseUUIDPipe) id: string,
	): Promise<MonitorWithRegionsDto> {
		return await this.monitorService.findByIdFull(userId, id);
	}

	/** Get a monitor by ID with regions IDs */
	@Auth()
	@ApiOkResponse({ type: MonitorWithRegionsIdsDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.MONITOR.NOT_FOUND)
	@Get('id/:id')
	public async findById(
		@Authorized('id') userId: string,
		@Param('id', ParseUUIDPipe) id: string,
	): Promise<MonitorWithRegionsIdsDto> {
		return await this.monitorService.findById(userId, id);
	}

	/** Update a monitor by ID */
	@Auth()
	@ApiOkResponse({ type: BaseMonitorDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.MONITOR.NOT_FOUND)
	@Patch(':id')
	public async update(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
		@Body() dto: UpdateMonitorDto,
	): Promise<BaseMonitorWithRegionsIdsDto> {
		return await this.monitorService.update(id, userId, dto);
	}

	/** Update a monitor's active status by ID */
	@Auth()
	@ApiOkResponse({ type: BaseMonitorDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.MONITOR.NOT_FOUND)
	@Patch(':id/active-status')
	public async updateActiveStatus(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	): Promise<BaseMonitorDto> {
		return await this.monitorService.updateActiveStatus(id, userId);
	}

	/** Delete a monitor by ID */
	@Auth()
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.MONITOR.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.MONITOR.NOT_FOUND)
	@Delete(':id')
	public async remove(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	): Promise<MessageResponse> {
		return await this.monitorService.remove(id, userId);
	}
}
