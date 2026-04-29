import { INestApplication } from '@nestjs/common';
import {
	OpenAPIObject,
	SwaggerCustomOptions,
	SwaggerModule,
} from '@nestjs/swagger';

interface SetupSwaggerParams {
	app: INestApplication;
	document: OpenAPIObject;
	path: string;
	options?: SwaggerCustomOptions;
}

export const setupSwagger = ({
	app,
	document,
	path,
	options,
}: SetupSwaggerParams) => {
	SwaggerModule.setup(path, app, document, {
		jsonDocumentUrl: options?.jsonDocumentUrl || `${path}/json`,
		yamlDocumentUrl: options?.yamlDocumentUrl || `${path}/yaml`,
		customSiteTitle: options?.customSiteTitle || document.info.title,
		...options,
	});
};
