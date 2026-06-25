import { ERROR_MESSAGES } from '@libs/constants';
import { ClientInfoDto } from '@libs/dto/client-info.dto';
import {
	forwardRef,
	Inject,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { AuthService } from '../../auth.service';
import { TokensDto } from '../../dto/tokens.dto';

@Injectable()
export class GoogleService {
	private readonly googleClient: OAuth2Client;

	constructor(
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
	) {
		this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
	}

	public async verifyOneTapToken(
		credential: string,
		clientInfo: ClientInfoDto,
	): Promise<TokensDto> {
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

			return await this.authService.validateOAuthLogin(
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
