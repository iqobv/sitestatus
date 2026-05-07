import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { Auth, Authorized, OptionalAuth } from '@libs/decorators';
import { createCustomMessageDto } from '@libs/utils';
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
	ApiConflictResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import {
	CreateStatusPageDto,
	FullStatusPageDto,
	PublicStatusPageDto,
	PublicStatusPageMonitorsDto,
	StatusPageDto,
	UpdateStatusPageDto,
} from './dto';
import { StatusPageService } from './status-page.service';

@ApiTags('Status Pages')
@Controller('status-pages')
export class StatusPageController {
	constructor(private readonly statusPageService: StatusPageService) {}

	@Auth()
	@ApiOperation({ summary: 'Create a new status page' })
	@ApiConflictResponse({
		type: createCustomMessageDto(
			ERROR_MESSAGES.STATUS_PAGE.STATUS_PAGE_SLUG_EXISTS,
			'slug',
		),
	})
	@ApiOkResponse({ type: FullStatusPageDto })
	@Post()
	async createStatusPage(
		@Authorized('id') userId: string,
		@Body() dto: CreateStatusPageDto,
	) {
		return await this.statusPageService.createStatusPage(userId, dto);
	}

	@OptionalAuth()
	@ApiOperation({ summary: 'Get a status page by slug' })
	@ApiOkResponse({ type: PublicStatusPageDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(
			ERROR_MESSAGES.STATUS_PAGE.STATUS_PAGE_NOT_FOUND,
		),
	})
	@Get('slug/:slug')
	async getStatusPageBySlug(
		@Param('slug') slug: string,
		@Authorized('id') userId?: string,
	) {
		return await this.statusPageService.getStatusPageBySlug(
			slug,
			userId ?? null,
		);
	}

	@OptionalAuth()
	@ApiOperation({ summary: 'Get monitors for a status page by slug' })
	@ApiOkResponse({ type: [PublicStatusPageMonitorsDto] })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(
			ERROR_MESSAGES.STATUS_PAGE.STATUS_PAGE_NOT_FOUND,
		),
	})
	@Get('slug/:slug/monitors')
	async getMonitorsBySlug(
		@Param('slug') slug: string,
		@Authorized('id') userId?: string,
	) {
		return await this.statusPageService.getMonitorsBySlug(slug, userId ?? null);
	}

	@Auth()
	@ApiOperation({ summary: 'Get a status page by id' })
	@ApiOkResponse({ type: [FullStatusPageDto] })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(
			ERROR_MESSAGES.STATUS_PAGE.STATUS_PAGE_NOT_FOUND,
		),
	})
	@Get('id/:id')
	async getStatusPageById(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	) {
		return await this.statusPageService.getStatusPageById(id, userId);
	}

	@Auth()
	@ApiOperation({ summary: 'Get status pages for a user' })
	@ApiOkResponse({ type: [StatusPageDto] })
	@Get('me')
	async getStatusPagesByUserId(@Authorized('id') userId: string) {
		return await this.statusPageService.getStatusPagesByUserId(userId);
	}

	@Auth()
	@ApiOperation({ summary: 'Update a status page' })
	@ApiOkResponse({ type: [FullStatusPageDto] })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(
			ERROR_MESSAGES.STATUS_PAGE.STATUS_PAGE_NOT_FOUND,
		),
	})
	@ApiConflictResponse({
		type: createCustomMessageDto(
			ERROR_MESSAGES.STATUS_PAGE.STATUS_PAGE_SLUG_EXISTS,
			'slug',
		),
	})
	@Patch(':id')
	async updateStatusPage(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
		@Body() dto: UpdateStatusPageDto,
	) {
		return await this.statusPageService.updateStatusPage(id, userId, dto);
	}

	@Auth()
	@ApiOperation({ summary: 'Delete a status page' })
	@ApiOkResponse({
		type: createCustomMessageDto(
			SUCCESS_MESSAGES.STATUS_PAGE.STATUS_PAGE_DELETED,
		),
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(
			ERROR_MESSAGES.STATUS_PAGE.STATUS_PAGE_NOT_FOUND,
		),
	})
	@Delete(':id')
	async deleteStatusPage(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	) {
		return await this.statusPageService.deleteStatusPage(id, userId);
	}
}
