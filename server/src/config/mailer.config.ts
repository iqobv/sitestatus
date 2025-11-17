import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

export const getMailerConfig = (confgigService: ConfigService) =>
	nodemailer.createTransport({
		host: confgigService.getOrThrow<string>('SMTP_HOST'),
		secure: false,
		port: confgigService.getOrThrow<number>('SMTP_PORT'),
		auth: {
			user: confgigService.getOrThrow<string>('SMTP_USER'),
			pass: confgigService.getOrThrow<string>('SMTP_PASSWORD'),
		},
	});
