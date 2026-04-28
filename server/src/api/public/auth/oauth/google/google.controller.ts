import { extractClientInfo, setAuthCookies } from '@libs/utils';
import {
	Body,
	Controller,
	forwardRef,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Post,
	Req,
	Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiExcludeController } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AuthService } from '../../auth.service';
import { GoogleAuth } from '../../decorators';
import { OAuthDto } from '../dto';
import { GoogleOneTapDto } from './dto';
import { GoogleService } from './google.service';

@ApiExcludeController()
@Controller('oauth/google')
export class GoogleController {
	constructor(
		private readonly googleService: GoogleService,
		private readonly configService: ConfigService,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
	) {}

	@GoogleAuth()
	@Get('')
	async googleAuth() {}

	@Get('callback')
	@GoogleAuth()
	async googleAuthCallback(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
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
	@HttpCode(HttpStatus.OK)
	async googleOneTapLogin(
		@Body() dto: GoogleOneTapDto,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const clientInfo = extractClientInfo(req);
		const { accessToken, refreshToken } =
			await this.googleService.verifyOneTapToken(dto.credential, clientInfo);

		setAuthCookies(res, accessToken, refreshToken, this.configService);

		return { message: 'Google One Tap login successful' };
	}
}
