import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppConfig } from './schemas/app.schema';

export const getCorsConfig = (config: AppConfig): CorsOptions => ({
	origin: [config.MAIN_URL, config.APP_URL, config.STATUS_URL],
	credentials: true,
	allowedHeaders: [
		'Content-Type',
		'Authorization',
		'Accept',
		'X-Requested-With',
		'X-Forwarded-Client-IP',
	],
	methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
});
