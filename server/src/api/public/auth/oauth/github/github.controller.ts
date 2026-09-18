import { EnvService } from '@infra/env/env.service';
import { extractClientInfo } from '@libs/utils/client-info.util';
import { Controller, forwardRef, Get, Inject, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from '../../auth.service';
import { CookieService } from '../../cookie/cookie.service';
import { GithubAuth } from '../../decorators/github-auth.decorator';
import { OAuthDto } from '../../dto/o-auth.dto';

@Controller('oauth/github')
export class GithubController {
	constructor(
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
		private readonly envService: EnvService,
		private readonly cookieService: CookieService,
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

		this.cookieService.setAuthCookies(res, accessToken, refreshToken);

		const targetOrigin = this.envService.get('OAUTH_REDIRECT_ORIGIN');

		res.send(`
			<script>
				window.opener.postMessage({ success: true }, '${targetOrigin}');
				window.close();
			</script>`);
	}
}
