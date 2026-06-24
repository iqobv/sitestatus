import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { IsPublic } from '@libs/decorators/is-public.decorator';
import { OptionalAuth } from '@libs/decorators/optional-auth.decorator';
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
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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

	@Auth()
	@ApiOperation({ summary: 'Create a new status page' })
	@ApiOkResponse({ type: FullStatusPageDto })
	@ApiErrorResponse(HttpStatus.CONFLICT, ERROR_MESSAGES.STATUS_PAGE.SLUG_EXISTS)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.MONITOR.NOT_FOUND)
	@Post()
	public async createStatusPage(
		@Authorized('id') userId: string,
		@Body() dto: CreateStatusPageDto,
	) {
		return await this.statusPageService.createStatusPage(userId, dto);
	}

	@OptionalAuth()
	@ApiOperation({ summary: 'Get a status page by slug' })
	@ApiOkResponse({ type: PublicStatusPageDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.STATUS_PAGE.NOT_FOUND)
	@Get('slug/:slug')
	public async getStatusPageBySlug(
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
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.STATUS_PAGE.NOT_FOUND)
	@Get('slug/:slug/monitors')
	public async getMonitorsBySlug(
		@Param('slug') slug: string,
		@Authorized('id') userId?: string,
	) {
		return await this.statusPageService.getMonitorsBySlug(slug, userId ?? null);
	}

	@Auth()
	@ApiOperation({ summary: 'Get a status page by id' })
	@ApiOkResponse({ type: [FullStatusPageDto] })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.STATUS_PAGE.NOT_FOUND)
	@Get('id/:id')
	public async getStatusPageById(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	) {
		return await this.statusPageService.getStatusPageById(id, userId);
	}

	@Auth()
	@ApiOperation({ summary: 'Get status pages for a user' })
	@ApiOkResponse({ type: PaginatedStatusPagesDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.STATUS_PAGE.NOT_FOUND)
	@Get('me')
	public async getStatusPagesByUserId(
		@Authorized('id') userId: string,
		@Query() query: StatusPagesQueryDto,
	): Promise<PaginatedStatusPagesDto> {
		return await this.statusPageService.getStatusPagesByUserId(userId, query);
	}

	@Auth()
	@ApiOperation({ summary: 'Update a status page' })
	@ApiOkResponse({ type: [FullStatusPageDto] })
	@ApiErrorResponse(
		HttpStatus.CONFLICT,
		withField(ERROR_MESSAGES.STATUS_PAGE.SLUG_EXISTS, 'slug'),
	)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.STATUS_PAGE.NOT_FOUND,
		ERROR_MESSAGES.MONITOR.NOT_FOUND,
	])
	@Patch(':id')
	public async updateStatusPage(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
		@Body() dto: UpdateStatusPageDto,
	) {
		return await this.statusPageService.updateStatusPage(id, userId, dto);
	}

	@Auth()
	@ApiOperation({ summary: 'Delete a status page' })
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.STATUS_PAGE.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.STATUS_PAGE.NOT_FOUND)
	@Delete(':id')
	public async deleteStatusPage(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	) {
		return await this.statusPageService.deleteStatusPage(id, userId);
	}
}
