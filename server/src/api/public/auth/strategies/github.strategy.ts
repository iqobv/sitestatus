import { ERROR_MESSAGES } from '@libs/constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { OAuthDto } from '../dto/o-auth.dto';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.getOrThrow<string>('GITHUB_CLIENT_ID'),
			clientSecret: configService.getOrThrow<string>('GITHUB_CLIENT_SECRET'),
			callbackURL: configService.getOrThrow<string>('GITHUB_CALLBACK_URL'),
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
