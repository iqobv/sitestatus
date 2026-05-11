import { DocumentBuilder } from '@nestjs/swagger';

export const basicSwaggerConfig = (
	title: string,
	description: string,
	version: string,
) => {
	return new DocumentBuilder()
		.setTitle(title)
		.setDescription(description)
		.setVersion(version)
		.addGlobalResponse({
			status: '5XX',
			description: 'Internal Server Error',
		})
		.addCookieAuth('accessToken', {
			type: 'http',
			in: 'Header',
			scheme: 'Bearer',
		})
		.addCookieAuth('refreshToken', {
			type: 'http',
			in: 'Header',
			scheme: 'Bearer',
		});
};
