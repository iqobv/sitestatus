import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { User } from 'generated/prisma/client';
import { AuthService } from '../auth.service';
import { GoogleAuth } from '../decorators';

@ApiExcludeController()
@Controller('oauth')
export class OauthController {
	constructor(private readonly authService: AuthService) {}

	@GoogleAuth()
	@Get('google')
	async googleAuth() {}

	@Get('google/callback')
	@GoogleAuth()
	async googleAuthCallback(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const user = req.user as User;
		await this.authService.login(user, req);

		res.send(`
			<script>
				window.opener.postMessage({ success: true }, '${process.env.GOOGLE_REDIRECT_ORIGIN}');
				window.close();
			</script>`);
	}
}
