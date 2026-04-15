import { INestApplication, Type } from '@nestjs/common';
import {
	OpenAPIObject,
	SwaggerCustomOptions,
	SwaggerDocumentOptions,
	SwaggerModule,
} from '@nestjs/swagger';
import { getDeepModules } from './get-deep-modules.util';

interface SetupSwaggerParams {
	app: INestApplication;
	config: Omit<OpenAPIObject, 'paths'>;
	include?: SwaggerDocumentOptions['include'];
	path: string;
	options?: SwaggerCustomOptions;
}

export const setupSwagger = ({
	app,
	config,
	include,
	path,
	options,
}: SetupSwaggerParams) => {
	const documentFactory = () =>
		SwaggerModule.createDocument(app, config, {
			include: include ? getDeepModules(include as Type<unknown>[]) : undefined,
			deepScanRoutes: true,
		});
	SwaggerModule.setup(path, app, documentFactory, {
		jsonDocumentUrl: options?.jsonDocumentUrl || `${path}/json`,
		yamlDocumentUrl: options?.yamlDocumentUrl || `${path}/yaml`,
		customSiteTitle: options?.customSiteTitle || config.info.title,
		...options,
	});
};
