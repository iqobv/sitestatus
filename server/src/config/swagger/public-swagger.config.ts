import { basicSwaggerConfig } from './basic-swagger.config';

export const getPublicSwaggerConfig = () =>
	basicSwaggerConfig(
		'SiteStatus API',
		'SiteStatus API documentation.',
		'1.0.0',
	).build();
