import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';
import ms, { StringValue } from 'ms';

import { isDev, parseBoolean } from '@libs/utils';

export const getCookieConfig = (
	config: ConfigService,
	maxAge: StringValue | number,
): CookieOptions => {
	return {
		domain: isDev(config)
			? undefined
			: config.getOrThrow<string>('COOKIE_DOMAIN'),
		maxAge: typeof maxAge === 'string' ? ms(maxAge) : maxAge,
		httpOnly: parseBoolean(config.getOrThrow<string>('COOKIE_HTTP_ONLY')),
		secure: parseBoolean(config.getOrThrow<string>('COOKIE_SECURE')),
		sameSite: config.getOrThrow<string>('COOKIE_SAME_SITE') as
			| 'lax'
			| 'strict'
			| 'none',
	};
};
