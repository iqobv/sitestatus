import { DocumentBuilder } from '@nestjs/swagger';

export const getSwaggerConfig = () => {
	return new DocumentBuilder()
		.setTitle('Uptime monitror API')
		.setDescription('Uptime monitor API documentation')
		.setVersion('1.0.0')
		.build();
};
