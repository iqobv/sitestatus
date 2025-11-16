import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from 'generated/prisma/client';
import { OauthService } from './oauth.service';

@Controller('oauth')
export class OauthController {
	constructor(private readonly oauthService: OauthService) {}

	@Get('google')
	@UseGuards(AuthGuard('google'))
	async googleAuth() {}

	@Get('google/callback')
	@UseGuards(AuthGuard('google'))
	async googleAuthCallback(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const user = req.user as User;
		return await this.oauthService.login(user, res);
	}
}
