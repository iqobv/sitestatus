import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { IsPublic } from '@libs/decorators/is-public.decorator';
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
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import {
	BaseMonitorDto,
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

	@Auth()
	@ApiOperation({ summary: 'Create a new monitor' })
	@ApiCreatedResponse({ type: BaseMonitorDto })
	@Post('create')
	async create(
		@Authorized('id') userId: string,
		@Body() dto: CreateMonitorDto,
	) {
		return await this.monitorService.create(userId, dto);
	}

	@Auth()
	@ApiOperation({ summary: 'Get all monitors for the authenticated user' })
	@ApiOkResponse({ type: PaginatedMonitorsDto })
	@Get()
	async findAll(
		@Authorized('id') userId: string,
		@Query() query: QueryMonitorsDto,
	) {
		return await this.monitorService.findAll(userId, query);
	}

	@Auth()
	@ApiOperation({ summary: 'Get all monitors by projectId' })
	@ApiOkResponse({ type: PaginatedMonitorsDto })
	@Get('projects/:projectId')
	async findAllMonitorsByProjectId(
		@Authorized('id') userId: string,
		@Param('projectId', ParseUUIDPipe) projectId: string,
		@Query() query: QueryMonitorsDto,
	) {
		return await this.monitorService.findAll(userId, query, projectId);
	}

	@Auth()
	@ApiOperation({ summary: 'Get full details of a monitor by ID' })
	@ApiOkResponse({ type: MonitorWithRegionsDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.MONITOR.NOT_FOUND)
	@Get('id/:id/full')
	async findByIdFull(
		@Authorized('id') userId: string,
		@Param('id', ParseUUIDPipe) id: string,
	) {
		return await this.monitorService.findByIdFull(userId, id);
	}

	@Auth()
	@ApiOperation({ summary: 'Get a monitor by ID' })
	@ApiOkResponse({ type: MonitorWithRegionsIdsDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.MONITOR.NOT_FOUND)
	@Get('id/:id')
	async findById(
		@Authorized('id') userId: string,
		@Param('id', ParseUUIDPipe) id: string,
	) {
		return await this.monitorService.findById(userId, id);
	}

	@Auth()
	@ApiOperation({ summary: 'Update monitor by ID' })
	@ApiOkResponse({ type: BaseMonitorDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.MONITOR.NOT_FOUND)
	@Patch(':id')
	async update(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
		@Body() dto: UpdateMonitorDto,
	) {
		return await this.monitorService.update(id, userId, dto);
	}

	@Auth()
	@ApiOperation({ summary: 'Update monitor active status by ID' })
	@ApiOkResponse({ type: BaseMonitorDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.MONITOR.NOT_FOUND)
	@Patch(':id/active-status')
	async updateActiveStatus(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	) {
		return await this.monitorService.updateActiveStatus(id, userId);
	}

	@Auth()
	@ApiOperation({ summary: 'Remove monitor by ID' })
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.MONITOR.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.MONITOR.NOT_FOUND)
	@Delete(':id')
	async remove(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	) {
		return await this.monitorService.remove(id, userId);
	}
}
