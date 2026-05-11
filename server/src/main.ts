import {
	getApiVersioningConfig,
	getCorsConfig,
	getPrivateSwaggerConfig,
	getPublicSwaggerConfig,
	getValidationPipeConfig,
} from '@config';
import { isDev, setupSwagger } from '@libs/utils';
import { filterSwaggerDocument } from '@libs/utils/filter-swagger.util';
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

	const isProd = !isDev(config);

	app.use(
		helmet({
			crossOriginOpenerPolicy: { policy: 'unsafe-none' },
			contentSecurityPolicy: {
				directives: {
					...helmet.contentSecurityPolicy.getDefaultDirectives(),
					'script-src': ["'self'", "'unsafe-inline'"],
					'upgrade-insecure-requests': isProd ? [] : null,
				},
			},
		}),
	);

	app.enableCors(getCorsConfig(config));

	app.use(json({ limit: '1mb' }));
	app.use(urlencoded({ extended: true, limit: '1mb' }));

	app.use(cookieParser());

	app.set('trust proxy', true);

	const privateDocs = '/docs/private';

	app.use(
		privateDocs,
		basicAuth({
			users: {
				[config.getOrThrow<string>('ADMIN_DOCS_USER')]:
					config.getOrThrow<string>('ADMIN_DOCS_PASSWORD'),
			},
			challenge: true,
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

	await app.listen(process.env.PORT ?? 5000, '0.0.0.0');
}
bootstrap().catch((err) => {
	console.error('Failed to bootstrap the application:', err);
	process.exit(1);
});
