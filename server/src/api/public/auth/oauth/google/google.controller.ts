import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { extractClientInfo } from '@libs/utils/client-info.util';
import { setAuthCookies } from '@libs/utils/cookie.util';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { AuthService } from '../../auth.service';
import { GoogleAuth } from '../../decorators/google-auth.decorator';
import { OAuthDto } from '../../dto/o-auth.dto';
import { GoogleOneTapDto } from './dto/google-one-tap.dto';
import { GoogleService } from './google.service';

@Controller('oauth/google')
export class GoogleController {
	constructor(
		private readonly googleService: GoogleService,
		private readonly configService: ConfigService,
		private readonly authService: AuthService,
	) {}

	@GoogleAuth()
	@Get()
	public async googleAuth(): Promise<void> {}

	@Get('callback')
	@GoogleAuth()
	public async googleAuthCallback(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	): Promise<void> {
		const clientInfo = extractClientInfo(req);
		const user = req.user as unknown as OAuthDto;

		const { accessToken, refreshToken } =
			await this.authService.validateOAuthLogin(user, clientInfo);

		setAuthCookies(res, accessToken, refreshToken, this.configService);

		const targetOrigin = this.configService.getOrThrow<string>(
			'OAUTH_REDIRECT_ORIGIN',
		);

		res.send(`
			<script>
				window.opener.postMessage({ success: true }, '${targetOrigin}');
				window.close();
			</script>`);
	}

	@Post('one-tap')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.GOOGLE_ONE_TAP_LOGIN)
	@ApiErrorResponse(HttpStatus.UNAUTHORIZED, [
		ERROR_MESSAGES.AUTH.FAILED_TO_VERIFY_GOOGLE_TOKEN,
		ERROR_MESSAGES.AUTH.INVALID_GOOGLE_TOKEN_PAYLOAD,
	])
	@HttpCode(HttpStatus.OK)
	public async googleOneTapLogin(
		@Body() dto: GoogleOneTapDto,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	): Promise<MessageResponse> {
		const clientInfo = extractClientInfo(req);
		const { accessToken, refreshToken } =
			await this.googleService.verifyOneTapToken(dto.credential, clientInfo);

		setAuthCookies(res, accessToken, refreshToken, this.configService);

		return SUCCESS_MESSAGES.AUTH.GOOGLE_ONE_TAP_LOGIN;
	}
}
