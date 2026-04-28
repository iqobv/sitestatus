import { ERROR_MESSAGES } from '@libs/constants';
import { ClientInfo } from '@libs/types';
import {
	forwardRef,
	Inject,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { AuthService } from '../../auth.service';

@Injectable()
export class GoogleService {
	private readonly googleClient: OAuth2Client;

	constructor(
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
	) {
		this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
	}

	async verifyOneTapToken(credential: string, clientInfo: ClientInfo) {
		try {
			const ticket = await this.googleClient.verifyIdToken({
				idToken: credential,
				audience: process.env.GOOGLE_CLIENT_ID,
			});

			const payload = ticket.getPayload();

			if (!payload || !payload.email || !payload.sub) {
				throw new UnauthorizedException(
					ERROR_MESSAGES.AUTH.INVALID_GOOGLE_TOKEN_PAYLOAD,
				);
			}

			return this.authService.validateOAuthLogin(
				{
					provider: 'google',
					providerId: payload.sub,
					email: payload.email,
				},
				clientInfo,
			);
		} catch {
			throw new UnauthorizedException(
				ERROR_MESSAGES.AUTH.FAILED_TO_VERIFY_GOOGLE_TOKEN,
			);
		}
	}
}
