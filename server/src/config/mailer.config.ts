import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

export const getMailerConfig = (
	configService: ConfigService,
): nodemailer.Transporter => {
	const host = configService.getOrThrow<string>('SMTP_HOST');
	const portString = configService.getOrThrow<string>('SMTP_PORT');
	const user = configService.getOrThrow<string>('SMTP_USER');
	const pass = configService.getOrThrow<string>('SMTP_PASSWORD');

	const port = Number(portString);

	if (Number.isNaN(port)) {
		throw new Error('SMTP_PORT must be a valid number');
	}

	return nodemailer.createTransport({
		host,
		port,
		secure: port === 465,
		auth: {
			user,
			pass,
		},
		logger: true,
		debug: true,
	});
};
