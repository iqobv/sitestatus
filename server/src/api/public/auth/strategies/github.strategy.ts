import { authEnvSchema } from '@config/schemas/auth.schema';
import { EnvService } from '@infra/env/env.service';
import { ERROR_MESSAGES } from '@libs/constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { OAuthDto } from '../dto/o-auth.dto';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
	constructor(private readonly envService: EnvService) {
		const config = envService.getGroup(authEnvSchema);

		super({
			clientID: config.GITHUB_CLIENT_ID,
			clientSecret: config.GITHUB_CLIENT_SECRET,
			callbackURL: config.GITHUB_CALLBACK_URL,
			scope: ['user:email'],
		});
	}

	public validate(
		_accessToken: string,
		_refreshToken: string,
		profile: Profile,
	): OAuthDto {
		const { id, emails } = profile;

		if (!emails || emails.length === 0)
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.GITHUB_NO_EMAIL);

		const primaryEmail = emails[0];

		return {
			provider: 'github',
			providerId: id,
			email: primaryEmail.value,
		};
	}
}
