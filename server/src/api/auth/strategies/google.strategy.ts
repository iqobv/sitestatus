import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { OauthService } from '../oauth/oauth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
		private readonly oauthService: OauthService,
	) {
		super({
			clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
			clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
			callbackURL: configService.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
			scope: ['email', 'profile'],
		});
	}

	async validate(accessToken: string, refreshToken: string, profile: Profile) {
		const { id, emails } = profile;

		if (!emails || !emails.length) {
			throw new Error('No email found in Google profile');
		}

		const user = await this.oauthService.validateOAuthUser(emails[0].value, id);

		return user;
	}
}
