import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ClientInfo } from 'src/libs/types';
import { AuthService } from '../../auth.service';
import { GoogleUserDto } from './dto';

@Injectable()
export class GoogleService {
	constructor(
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
	) {}

	async validateGoogleUser(googleUser: GoogleUserDto, clientInfo: ClientInfo) {
		return this.authService.validateOAuthLogin(
			{
				provider: 'google',
				providerId: googleUser.googleId,
				email: googleUser.email,
			},
			clientInfo,
		);
	}
}
