import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { Cookie } from '@libs/decorators/cookie.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { Controller, Delete, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AllSessionsDto } from './dto/all-sessions.dto';
import { SessionService } from './session.service';

@Auth()
@Controller('sessions')
export class SessionController {
	constructor(private readonly sessionService: SessionService) {}

	/** Get all sessions */
	@Get()
	@ApiOkResponse({ type: AllSessionsDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.SESSIONS.NOT_FOUND)
	public async getSessions(
		@Authorized('id') userId: string,
		@Cookie('refreshToken') refreshToken: string,
	): Promise<AllSessionsDto> {
		return await this.sessionService.getUserSessions(userId, refreshToken);
	}

	/** Terminate a specific session */
	@Delete('id/:id')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.SESSION.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.SESSIONS.NOT_FOUND)
	@ApiErrorResponse(HttpStatus.FORBIDDEN, ERROR_MESSAGES.SESSIONS.ACCESS_DENIED)
	public async terminateSession(
		@Param('id') sessionId: string,
		@Authorized('id') userId: string,
	): Promise<MessageResponse> {
		return await this.sessionService.deleteSession(sessionId, userId);
	}

	/** Terminate all other sessions */
	@Delete('all-other')
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.SESSION.ALL_OTHER_SESSIONS_DELETED,
	)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.SESSIONS.NOT_FOUND)
	public async terminateAllOtherSessions(
		@Authorized('id') userId: string,
		@Cookie('refreshToken') refreshToken: string,
	): Promise<MessageResponse> {
		return await this.sessionService.deleteAllOtherSessions(
			userId,
			refreshToken,
		);
	}
}
