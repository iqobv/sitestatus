import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import basicAuth from 'express-basic-auth';
import session, { Store } from 'express-session';
import passport from 'passport';
import { PrivateModule } from './api/private/private.module';
import { PublicModule } from './api/public/public.module';
import { AppModule } from './app.module';
import {
	getApiVersioningConfig,
	getCorsConfig,
	getPrivateSwaggerConfig,
	getPublicSwaggerConfig,
	getSessionConfig,
	getValidationPipeConfig,
} from './config';
import { REDIS_PROVIDER } from './infra/redis/redis.module';
import { setupSwagger } from './libs/utils';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const config = app.get(ConfigService);
	const redisStore: Store = app.get(REDIS_PROVIDER.REDIS_STORE);

	app.use(cookieParser(config.getOrThrow<string>('COOKIE_SECRET')));

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

	app.enableCors(getCorsConfig(config));
	app.useGlobalPipes(getValidationPipeConfig());
	app.enableVersioning(getApiVersioningConfig());
	app.use(session(getSessionConfig(config, redisStore)));

	app.use(passport.initialize());
	app.use(passport.session());

	setupSwagger({
		app,
		config: getPublicSwaggerConfig(),
		path: '/docs',
		include: [PublicModule],
		// options: {
		// 	customSiteTitle: 'URL Shorter API Docs',
		// },
	});

	setupSwagger({
		app,
		config: getPrivateSwaggerConfig(),
		path: privateDocs,
		include: [PrivateModule],
		// options: {
		// 	customSiteTitle: 'URL Shorter API Docs',
		// },
	});

	await app.listen(process.env.PORT ?? 5000, '0.0.0.0');
}
bootstrap().catch((err) => {
	console.error('Failed to bootstrap the application:', err);
	process.exit(1);
});
