import { extractClientInfo, setAuthCookies } from '@libs/utils';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiExcludeController } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { GoogleAuth } from '../../decorators';
import { GoogleUserDto } from './dto';
import { GoogleService } from './google.service';

@ApiExcludeController()
@Controller('oauth/google')
export class GoogleController {
	constructor(
		private readonly googleService: GoogleService,
		private readonly configService: ConfigService,
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
		const user = req.user as unknown as GoogleUserDto;

		const tokens = await this.googleService.validateGoogleUser(
			user,
			clientInfo,
		);

		const { accessToken, refreshToken } = tokens;

		setAuthCookies(res, accessToken, refreshToken, this.configService);

		res.send(`
			<script>
				window.opener.postMessage({ success: true }, '${process.env.GOOGLE_REDIRECT_ORIGIN}');
				window.close();
			</script>`);
	}
}
