import { Controller, Delete, Get, Param } from '@nestjs/common';
import { Auth, Authorized } from 'src/libs/decorators';
import { SessionService } from './session.service';

@Auth()
@Controller('sessions')
export class SessionController {
	constructor(private readonly sessionService: SessionService) {}

	@Get()
	async getSessions(@Authorized('id') userId: string) {
		return this.sessionService.getUserSessions(userId);
	}

	@Delete(':id')
	async terminateSession(
		@Param('id') sessionId: string,
		@Authorized('id') userId: string,
	) {
		await this.sessionService.deleteSession(sessionId, userId);
	}
}
