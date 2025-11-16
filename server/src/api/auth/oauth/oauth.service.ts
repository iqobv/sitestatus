import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { Response } from 'express';
import { User } from 'generated/prisma/client';
import { UserProviderService } from 'src/api/user-provider/user-provider.service';
import { UserService } from 'src/api/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class OauthService {
	constructor(
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly userProviderService: UserProviderService,
	) {}

	async login(user: User, res: Response) {
		await this.validateOAuthUser(user.email, user.id);

		return await this.authService.createSession(user, res);
	}

	async validateOAuthUser(email: string, providerId: string) {
		const userProvider =
			await this.userProviderService.findByProviderAndProviderId(
				'google',
				providerId,
			);

		if (userProvider) {
			return userProvider.user;
		}

		let user = await this.userService.findByEmail(email);

		if (!user) {
			user = await this.userService.createOauthUser(email);
		}

		await this.userProviderService.create({
			userId: user.id,
			provider: 'google',
			providerId,
		});

		return user;
	}
}
