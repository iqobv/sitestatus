import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import session, { Store } from 'express-session';
import passport from 'passport';
import { AppModule } from './app.module';
import {
	getApiVersioningConfig,
	getCorsConfig,
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

	app.enableCors(getCorsConfig(config));
	app.useGlobalPipes(getValidationPipeConfig());
	app.enableVersioning(getApiVersioningConfig());
	app.use(session(getSessionConfig(config, redisStore)));

	app.use(passport.initialize());
	app.use(passport.session());

	setupSwagger(app);

	await app.listen(process.env.PORT ?? 5000, '0.0.0.0');
}
bootstrap().catch((err) => {
	console.error('Failed to bootstrap the application:', err);
	process.exit(1);
});
