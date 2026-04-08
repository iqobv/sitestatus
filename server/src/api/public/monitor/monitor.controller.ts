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
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { ERROR_MESSAGES } from 'src/libs/constants';
import { Auth, Authorized } from 'src/libs/decorators';
import { createCustomMessageDto } from 'src/libs/utils';
import { CreateMonitorDto, MonitorDto, UpdateMonitorDto } from './dto';
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
	@Get('me')
	async findAll(@Authorized('id') userId: string) {
		return await this.monitorService.findAll(userId);
	}

	@Auth()
	@ApiOperation({ summary: 'Get monitor by ID' })
	@ApiOkResponse({ type: MonitorFullDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND),
	})
	@Get('id/:id')
	async findById(@Authorized('id') userId: string, @Param('id') id: string) {
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
		@Param('id') id: string,
		@Authorized('id') userId: string,
		@Body() dto: UpdateMonitorDto,
	) {
		return await this.monitorService.update(id, userId, dto);
	}

	@Auth()
	@ApiOperation({ summary: 'Remove monitor by ID' })
	@ApiOkResponse({ type: Boolean })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND),
	})
	@Delete(':id')
	async remove(@Param('id') id: string, @Authorized('id') userId: string) {
		return await this.monitorService.remove(id, userId);
	}
}
