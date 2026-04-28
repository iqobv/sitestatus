import { extractClientInfo, setAuthCookies } from '@libs/utils';
import { Controller, forwardRef, Get, Inject, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { AuthService } from '../../auth.service';
import { GithubAuth } from '../../decorators';
import { OAuthDto } from '../dto';

@Controller('oauth/github')
export class GithubController {
	constructor(
		private readonly configService: ConfigService,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
	) {}

	@Get()
	@GithubAuth()
	async githubAuth() {}

	@Get('callback')
	@GithubAuth()
	async githubAuthRedirect(
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
}
