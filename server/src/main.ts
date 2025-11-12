import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import {
	getApiVersioningConfig,
	getCorsConfig,
	getValidationPipeConfig,
} from './config';
import { setupSwagger } from './libs/utils';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const config = app.get(ConfigService);

	app.use(cookieParser(config.getOrThrow<string>('COOKIE_SECRET')));

	app.set('trust proxy', true);

	app.enableCors(getCorsConfig(config));
	app.useGlobalPipes(getValidationPipeConfig());
	app.enableVersioning(getApiVersioningConfig());

	setupSwagger(app);

	await app.listen(process.env.PORT ?? 5000);
}
bootstrap().catch((err) => {
	console.error('Failed to bootstrap the application:', err);
	process.exit(1);
});
