import { validate } from '@config/env.validation';
import * as Sentry from '@sentry/nestjs';

const config = validate(process.env);

Sentry.init({
	dsn: config.SENTRY_DSN,
	tracesSampleRate: 1.0,
	dataCollection: {
		userInfo: false,
		cookies: false,
		httpBodies: [
			'incomingRequest',
			'outgoingRequest',
			'incomingResponse',
			'outgoingRequest',
		],
		httpHeaders: true,
		urlQueryParams: {
			deny: ['password', 'token', 'apiKey', 'accessToken', 'refreshToken'],
		},
	},
	enabled: config.NODE_ENV === 'production',
	beforeSend(event) {
		if (event.request?.data && typeof event.request.data === 'object') {
			const data = event.request.data as Record<string, unknown>;

			if ('password' in data) data.password = '[REDACTED]';
			if ('token' in data) data.token = '[REDACTED]';
			if ('newPassword' in data) data.newPassword = '[REDACTED]';
			if ('oldPassword' in data) data.oldPassword = '[REDACTED]';
			if ('accessToken' in data) data.accessToken = '[REDACTED]';
			if ('refreshToken' in data) data.refreshToken = '[REDACTED]';
		}

		return event;
	},
});
