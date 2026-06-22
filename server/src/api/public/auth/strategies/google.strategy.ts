import { ERROR_MESSAGES } from '@libs/constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { OAuthDto } from '../dto/o-auth.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
			clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
			callbackURL: configService.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
			scope: ['email', 'profile'],
		});
	}

	public validate(
		_accessToken: string,
		_refreshToken: string,
		profile: Profile,
		done: VerifyCallback,
	): void {
		const { id, emails } = profile;

		if (!emails || emails.length === 0) {
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.GOOGLE_NO_EMAIL);
		}

		const user: OAuthDto = {
			provider: 'google',
			providerId: id,
			email: emails[0].value,
		};

		done(null, user);
	}
}
