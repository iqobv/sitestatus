import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfig } from 'src/config';

export const setupSwagger = (app: INestApplication) => {
	const config = getSwaggerConfig();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('/docs', app, document, {
		customSiteTitle: 'Uptime Monitoring API Docs',
		jsonDocumentUrl: '/docs/json',
		yamlDocumentUrl: '/docs/yaml',
	});
};
