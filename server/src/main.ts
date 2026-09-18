import { getApiVersioningConfig } from '@config/api-versioning.config';
import { getCorsConfig } from '@config/cors.config';
import { appEnvSchema } from '@config/schemas/app.schema';
import { getPrivateSwaggerConfig } from '@config/swagger/private-swagger.config';
import { getPublicSwaggerConfig } from '@config/swagger/public-swagger.config';
import { getValidationPipeConfig } from '@config/validation-pipe.config';
import { EnvService } from '@infra/env/env.service';
import { CustomExceptionFilter } from '@libs/filters/custom-exception.filter';
import { filterSwaggerDocument } from '@libs/utils/filter-swagger.util';
import { isDev } from '@libs/utils/is-dev.util';
import { setupSwagger } from '@libs/utils/swagger.util';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import basicAuth from 'express-basic-auth';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const config = app.get(ConfigService);
	const envService = app.get(EnvService);
	const appConfig = envService.getGroup(appEnvSchema);

	const isProd = !isDev(config);

	app.use(
		helmet({
			crossOriginOpenerPolicy: { policy: 'unsafe-none' },
			contentSecurityPolicy: {
				directives: {
					...helmet.contentSecurityPolicy.getDefaultDirectives(),
					'script-src': [
						"'self'",
						"'unsafe-inline'",
						"'unsafe-eval'",
						'https://cdn.jsdelivr.net',
					],
					'style-src': [
						"'self'",
						"'unsafe-inline'",
						'https://fonts.googleapis.com',
						'https://cdn.jsdelivr.net',
						'data:',
					],
					'font-src': ["'self'", 'https://fonts.gstatic.com'],
					'img-src': [
						"'self'",
						'data:',
						'https://cdn.jsdelivr.net',
						'https://cdn.sleeptrackly.com',
						'https://www.sleeptrackly.com',
					],
					'connect-src': [
						"'self'",
						'https://api.scalar.com',
						'https://cdn.jsdelivr.net',
					],
					'upgrade-insecure-requests': isProd ? [] : null,
				},
			},
		}),
	);

	app.enableCors(getCorsConfig(appConfig));

	app.use(json({ limit: '1mb' }));
	app.use(urlencoded({ extended: true, limit: '1mb' }));

	app.use(cookieParser());

	app.set('trust proxy', true);

	const privateDocs = '/docs/private';

	app.useGlobalFilters(new CustomExceptionFilter());

	app.use(
		privateDocs,
		basicAuth({
			challenge: true,
			users: {
				[appConfig.ADMIN_DOCS_USER]: appConfig.ADMIN_DOCS_PASSWORD,
			},
		}),
	);

	app.useGlobalPipes(getValidationPipeConfig());
	app.enableVersioning(getApiVersioningConfig());

	const publicConfig = getPublicSwaggerConfig();
	const privateConfig = getPrivateSwaggerConfig();

	const fullDocument = SwaggerModule.createDocument(app, publicConfig, {
		deepScanRoutes: true,
	});

	const publicDocument = filterSwaggerDocument(
		fullDocument,
		true,
		publicConfig,
	);

	const privateDocument = filterSwaggerDocument(
		fullDocument,
		false,
		privateConfig,
	);

	setupSwagger({
		app,
		document: publicDocument,
		path: '/docs',
	});

	setupSwagger({
		app,
		document: privateDocument,
		path: privateDocs,
	});

	await app.listen(appConfig.PORT, '0.0.0.0');
}
bootstrap().catch((err) => {
	console.error('Failed to bootstrap the application:', err);
	process.exit(1);
});
