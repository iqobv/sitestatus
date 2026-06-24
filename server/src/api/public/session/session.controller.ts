import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { Cookie } from '@libs/decorators/cookie.decorator';
import { Controller, Delete, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AllSessionsDto } from './dto/all-sessions.dto';
import { SessionService } from './session.service';

@Auth()
@Controller('sessions')
export class SessionController {
	constructor(private readonly sessionService: SessionService) {}

	@Get()
	@ApiOperation({
		summary: 'Get all active sessions for the authenticated user',
	})
	@ApiOkResponse({ type: AllSessionsDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.SESSIONS.NOT_FOUND)
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
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.SESSION.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.SESSIONS.NOT_FOUND)
	@ApiErrorResponse(HttpStatus.FORBIDDEN, ERROR_MESSAGES.SESSIONS.ACCESS_DENIED)
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
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.SESSION.ALL_OTHER_SESSIONS_DELETED,
	)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.SESSIONS.NOT_FOUND)
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
