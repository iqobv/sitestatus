import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import Mail from 'nodemailer/lib/mailer';
import { getMailerConfig } from 'src/config';
import { SendEmailDto } from './dto';
import { ResetPasswordTemplate, VerificationEmailTemplate } from './templates';

@Injectable()
export class MailService {
	private readonly transport: ReturnType<typeof getMailerConfig>;

	constructor(private readonly configService: ConfigService) {
		this.transport = getMailerConfig(configService);
	}

	async sendVerificationEmail(email: string, token: string) {
		const domain = this.configService.getOrThrow<string>('MAIL_TO_URL');
		const url = `${domain}/email-verify?token=${token}`;
		const html = await render(VerificationEmailTemplate({ url }));

		return await this.sendMail({
			recipients: [email],
			subject: 'Please verify your email address',
			html,
		});
	}

	async sendPasswordResetEmail(email: string, token: string) {
		const domain = this.configService.getOrThrow<string>('MAIL_TO_URL');
		const url = `${domain}/reset-password?token=${token}`;
		const html = await render(ResetPasswordTemplate({ url }));

		return await this.sendMail({
			recipients: [email],
			subject: 'Reset your password',
			html,
		});
	}

	async sendMail(dto: SendEmailDto) {
		const { from, recipients, subject, html } = dto;

		const options: Mail.Options = {
			from:
				from ??
				`"${this.configService.getOrThrow<string>('MAIL_FROM_NAME')}" <${this.configService.getOrThrow<string>('MAIL_FROM_ADDRESS')}>`,
			to: [...recipients],
			subject,
			html,
		};

		try {
			const result = await this.transport.sendMail(options);

			return result;
		} catch (error) {
			console.log('error', error);
		}
	}
}
