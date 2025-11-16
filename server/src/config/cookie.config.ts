import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';

import { isDev, parseBoolean } from 'src/libs/utils';

export const getCookieConfig = (
	config: ConfigService,
	expiresAt: number,
): CookieOptions => ({
	domain: isDev(config)
		? undefined
		: config.getOrThrow<string>('COOKIE_DOMAIN'),
	maxAge: expiresAt,
	httpOnly: parseBoolean(config.getOrThrow<string>('COOKIE_HTTP_ONLY')),
	secure: parseBoolean(config.getOrThrow<string>('COOKIE_SECURE')),
	sameSite: config.getOrThrow<string>('COOKIE_SAME_SITE') as
		| 'lax'
		| 'strict'
		| 'none',
});
