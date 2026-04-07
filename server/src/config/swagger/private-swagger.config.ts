import { basicSwaggerConfig } from './basic-swagger.config';

export const getPrivateSwaggerConfig = () =>
	basicSwaggerConfig(
		'SiteStatus Private API',
		'SiteStatus Private API documentation.',
		'1.0.0',
	).build();
