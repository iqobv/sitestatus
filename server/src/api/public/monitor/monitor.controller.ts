import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'src/libs/constants';
import { Auth, Authorized } from 'src/libs/decorators';
import { createCustomMessageDto } from 'src/libs/utils';
import {
	CreateMonitorDto,
	MonitorDto,
	MonitorWithRegionsDto,
	UpdateMonitorDto,
} from './dto';
import { MonitorFullDto } from './dto/monitor-full.dto';
import { MonitorService } from './monitor.service';

@Controller('monitors')
export class MonitorController {
	constructor(private readonly monitorService: MonitorService) {}

	@Auth()
	@ApiOperation({ summary: 'Create a new monitor' })
	@ApiCreatedResponse({ type: MonitorDto })
	@Post('create')
	async create(
		@Authorized('id') userId: string,
		@Body() dto: CreateMonitorDto,
	) {
		return await this.monitorService.create(userId, dto);
	}

	@Auth()
	@ApiOperation({ summary: 'Get all monitors for the authenticated user' })
	@ApiOkResponse({ type: [MonitorFullDto] })
	@Get('')
	async findAll(@Authorized('id') userId: string) {
		return await this.monitorService.findAll(userId);
	}

	@Auth()
	@ApiOperation({ summary: 'Get all monitors for the authenticated user' })
	@ApiOkResponse({ type: [MonitorFullDto] })
	@Get('projects/:projectId')
	async findAllMonitorsByProjectId(
		@Authorized('id') userId: string,
		@Param('projectId', ParseUUIDPipe) projectId: string,
	) {
		return await this.monitorService.findAll(userId, projectId);
	}

	@Auth()
	@ApiOperation({ summary: 'Get full details of a monitor by ID' })
	@ApiOkResponse({ type: MonitorFullDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND),
	})
	@Get('id/:id/full')
	async findByIdFull(
		@Authorized('id') userId: string,
		@Param('id', ParseUUIDPipe) id: string,
	) {
		return await this.monitorService.findByIdFull(userId, id);
	}

	@Auth()
	@ApiOperation({ summary: 'Get a monitor by ID' })
	@ApiOkResponse({ type: MonitorWithRegionsDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND),
	})
	@Get('id/:id')
	async findById(
		@Authorized('id') userId: string,
		@Param('id', ParseUUIDPipe) id: string,
	) {
		return await this.monitorService.findById(userId, id);
	}

	@Auth()
	@ApiOperation({ summary: 'Update monitor by ID' })
	@ApiOkResponse({ type: MonitorDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND),
	})
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
	@ApiOkResponse({ type: MonitorDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND),
	})
	@Patch(':id/active-status')
	async updateActiveStatus(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	) {
		return await this.monitorService.updateActiveStatus(id, userId);
	}

	@Auth()
	@ApiOperation({ summary: 'Remove monitor by ID' })
	@ApiOkResponse({
		type: createCustomMessageDto(SUCCESS_MESSAGES.MONITOR.MONITOR_DELETED),
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND),
	})
	@Delete(':id')
	async remove(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	) {
		return await this.monitorService.remove(id, userId);
	}
}
