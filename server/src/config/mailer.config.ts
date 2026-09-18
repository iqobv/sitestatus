import nodemailer from 'nodemailer';
import { SmtpConfig } from './schemas/smtp.schema';

export const getMailerConfig = (config: SmtpConfig): nodemailer.Transporter => {
	const host = config.SMTP_HOST;
	const portString = config.SMTP_PORT;
	const user = config.SMTP_USER;
	const pass = config.SMTP_PASSWORD;

	const port = Number(portString);

	if (Number.isNaN(port)) throw new Error('SMTP_PORT must be a valid number');

	return nodemailer.createTransport({
		host,
		port,
		secure: port === 465,
		auth: {
			user,
			pass,
		},
	});
};
