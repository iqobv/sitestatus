import { basicSwaggerConfig } from '@config/swagger/basic-swagger.config';
import { INestApplication } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export const setupSwagger = (app: INestApplication): void => {
	const config = basicSwaggerConfig(
		'SiteStatus API',
		'SiteStatus API documentation.',
		'1.3.0',
	).build();

	const documentFactory = (): OpenAPIObject =>
		SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('docs-raw', app, documentFactory(), {
		jsonDocumentUrl: '/docs-json',
		yamlDocumentUrl: '/docs-yaml',
		ui: false,
	});

	app.use(
		'/docs',
		apiReference({
			spec: {
				content: documentFactory(),
			},
			title: 'SiteStatus API Docs',
			pageTitle: 'SiteStatus API Docs',
			favicon: 'https://cdn.sitestatus.dev/icon.png',
			theme: 'default',
		}),
	);
};
