import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as Sentry from '@sentry/nestjs';

@Injectable()
export class OptionalAccessTokenGuard extends AuthGuard('jwt') {
	handleRequest<TUser = unknown>(
		err: Error | null,
		user: TUser | false,
	): TUser | null {
		if (
			err ||
			!user ||
			typeof user !== 'object' ||
			!('id' in user) ||
			typeof user.id !== 'string'
		)
			return null;

		Sentry.setUser({
			id: user.id,
		});

		return user;
	}
}
