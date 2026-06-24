import { extractClientInfo } from '@libs/utils/client-info.util';
import { setAuthCookies } from '@libs/utils/cookie.util';
import { Controller, forwardRef, Get, Inject, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { AuthService } from '../../auth.service';
import { GithubAuth } from '../../decorators/github-auth.decorator';
import { OAuthDto } from '../../dto/o-auth.dto';

@Controller('oauth/github')
export class GithubController {
	constructor(
		private readonly configService: ConfigService,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
	) {}

	@Get()
	@GithubAuth()
	public async githubAuth(): Promise<void> {}

	@Get('callback')
	@GithubAuth()
	public async githubAuthRedirect(
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
}
