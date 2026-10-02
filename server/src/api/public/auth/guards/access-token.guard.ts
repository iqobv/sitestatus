import { ERROR_MESSAGES } from '@libs/constants';
import { JwtPayload } from '@libs/types/jwt-payload.types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as Sentry from '@sentry/nestjs';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
	public handleRequest<TUser = JwtPayload>(err: unknown, user: unknown): TUser {
		if (err || !user) {
			if (err instanceof Error) throw err;

			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
		}

		Sentry.setUser({
			id: (user as JwtPayload).id,
		});

		return user as TUser;
	}
}
