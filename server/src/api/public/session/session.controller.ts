import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { Auth, Authorized, Cookie } from '@libs/decorators';
import { createCustomMessageDto } from '@libs/utils';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import {
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { AllSessionsDto } from './dto';
import { SessionService } from './session.service';

@Auth()
@Controller('sessions')
export class SessionController {
	constructor(private readonly sessionService: SessionService) {}

	@Get()
	@ApiOperation({
		summary: 'Get all active sessions for the authenticated user',
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.SESSIONS.SESSION_NOT_FOUND),
	})
	@ApiOkResponse({ type: AllSessionsDto })
	async getSessions(
		@Authorized('id') userId: string,
		@Cookie('refreshToken') refreshToken: string,
	) {
		return await this.sessionService.getUserSessions(userId, refreshToken);
	}

	@Delete('id/:id')
	@ApiOperation({
		summary: 'Terminate a specific session for the authenticated user',
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.SESSIONS.SESSION_NOT_FOUND),
	})
	@ApiForbiddenResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.SESSIONS.ACCESS_DENIED),
	})
	@ApiOkResponse({
		type: createCustomMessageDto(SUCCESS_MESSAGES.SESSION.SESSION_DELETED),
	})
	async terminateSession(
		@Param('id') sessionId: string,
		@Authorized('id') userId: string,
	) {
		return await this.sessionService.deleteSession(sessionId, userId);
	}

	@Delete('all-other')
	@ApiOperation({
		summary:
			'Terminate all other sessions except the current one for the authenticated user',
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.SESSIONS.SESSION_NOT_FOUND),
	})
	@ApiOkResponse({
		type: createCustomMessageDto(
			SUCCESS_MESSAGES.SESSION.ALL_OTHER_SESSIONS_DELETED,
		),
	})
	async terminateAllOtherSessions(
		@Authorized('id') userId: string,
		@Cookie('refreshToken') refreshToken: string,
	) {
		return await this.sessionService.deleteAllOtherSessions(
			userId,
			refreshToken,
		);
	}
}
