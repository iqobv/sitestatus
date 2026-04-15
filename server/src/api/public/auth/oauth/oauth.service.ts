import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserProviderService } from '../../user-provider/user-provider.service';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { OAuthDto } from './dto';

@Injectable()
export class OauthService {
	constructor(
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly userProviderService: UserProviderService,
	) {}

	async validateOAuthLogin(dto: OAuthDto) {
		const { provider, providerId, email } = dto;

		const providerUser =
			await this.userProviderService.findByProviderAndProviderId(
				provider,
				providerId,
			);

		if (providerUser) return providerUser.user;

		let user = await this.userService.findByEmail(email, true);
		if (!user) {
			user = await this.userService.create({
				email,
			});
		}

		await this.userProviderService.create({
			provider,
			providerId,
			userId: user.id,
		});

		return user;
	}
}
