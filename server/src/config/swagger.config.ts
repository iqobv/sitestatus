import { DocumentBuilder } from '@nestjs/swagger';

export const getSwaggerConfig = () => {
	return new DocumentBuilder()
		.setTitle('SiteStatus API')
		.setDescription('SiteStatus API documentation.')
		.setVersion('1.0.0')
		.addCookieAuth('sid', {
			type: 'http',
			in: 'Header',
			scheme: 'Bearer',
		})
		.build();
};
