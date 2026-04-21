import { ConfigService } from '@nestjs/config';
import { SessionOptions, Store } from 'express-session';

export const getSessionConfig = (
	config: ConfigService,
	store: Store,
): SessionOptions => ({
	secret: config.getOrThrow<string>('SESSION_SECRET'),
	name: config.getOrThrow<string>('SESSION_NAME'),
	resave: false,
	saveUninitialized: false,
	store,
});
