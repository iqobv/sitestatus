import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { IsPublic } from '@libs/decorators/is-public.decorator';
import { OptionalAuth } from '@libs/decorators/optional-auth.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { withField } from '@libs/utils/error-with-field.util';
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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateStatusPageDto } from './dto/create-status-page.dto';
import { PaginatedStatusPagesDto } from './dto/paginated-status-pages.dto';
import {
	PublicStatusPageDto,
	PublicStatusPageMonitorsDto,
} from './dto/public-status-page.dto';
import { FullStatusPageDto } from './dto/status-page.dto';
import { StatusPagesQueryDto } from './dto/status-pages-query.dto';
import { UpdateStatusPageDto } from './dto/update-status-page.dto';
import { StatusPageService } from './status-page.service';

@IsPublic()
@ApiTags('Status Pages')
@Controller('status-pages')
export class StatusPageController {
	constructor(private readonly statusPageService: StatusPageService) {}

	/** Create a new status page */
	@Auth()
	@Post()
	@ApiOkResponse({ type: FullStatusPageDto })
	@ApiErrorResponse(HttpStatus.CONFLICT, ERROR_MESSAGES.STATUS_PAGE.SLUG_EXISTS)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.MONITOR.NOT_FOUND)
	public async createStatusPage(
		@Authorized('id') userId: string,
		@Body() dto: CreateStatusPageDto,
	): Promise<FullStatusPageDto> {
		return await this.statusPageService.createStatusPage(userId, dto);
	}

	/** Get a status page by slug */
	@OptionalAuth()
	@Get('slug/:slug')
	@ApiOkResponse({ type: PublicStatusPageDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.STATUS_PAGE.NOT_FOUND)
	public async getStatusPageBySlug(
		@Param('slug') slug: string,
		@Authorized('id') userId?: string,
	): Promise<PublicStatusPageDto> {
		return await this.statusPageService.getStatusPageBySlug(
			slug,
			userId ?? null,
		);
	}

	/** Get monitors for a status page by slug */
	@OptionalAuth()
	@Get('slug/:slug/monitors')
	@ApiOkResponse({ type: [PublicStatusPageMonitorsDto] })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.STATUS_PAGE.NOT_FOUND)
	public async getMonitorsBySlug(
		@Param('slug') slug: string,
		@Authorized('id') userId?: string,
	): Promise<PublicStatusPageMonitorsDto[]> {
		return await this.statusPageService.getMonitorsBySlug(slug, userId ?? null);
	}

	/** Get a status page by ID */
	@Auth()
	@Get('id/:id')
	@ApiOkResponse({ type: [FullStatusPageDto] })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.STATUS_PAGE.NOT_FOUND)
	public async getStatusPageById(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	): Promise<FullStatusPageDto> {
		return await this.statusPageService.getStatusPageById(id, userId);
	}

	/** Get all status pages for the authenticated user */
	@Auth()
	@Get('me')
	@ApiOkResponse({ type: PaginatedStatusPagesDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.STATUS_PAGE.NOT_FOUND)
	public async getStatusPagesByUserId(
		@Authorized('id') userId: string,
		@Query() query: StatusPagesQueryDto,
	): Promise<PaginatedStatusPagesDto> {
		return await this.statusPageService.getStatusPagesByUserId(userId, query);
	}

	/** Update a status page */
	@Auth()
	@Patch(':id')
	@ApiOkResponse({ type: [FullStatusPageDto] })
	@ApiErrorResponse(
		HttpStatus.CONFLICT,
		withField(ERROR_MESSAGES.STATUS_PAGE.SLUG_EXISTS, 'slug'),
	)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.STATUS_PAGE.NOT_FOUND,
		ERROR_MESSAGES.MONITOR.NOT_FOUND,
	])
	public async updateStatusPage(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
		@Body() dto: UpdateStatusPageDto,
	): Promise<FullStatusPageDto> {
		return await this.statusPageService.updateStatusPage(id, userId, dto);
	}

	/** Delete a status page */
	@Auth()
	@Delete(':id')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.STATUS_PAGE.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.STATUS_PAGE.NOT_FOUND)
	public async deleteStatusPage(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	): Promise<MessageResponse> {
		return await this.statusPageService.deleteStatusPage(id, userId);
	}
}
