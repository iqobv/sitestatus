import { getMailerConfig } from '@config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import Mail from 'nodemailer/lib/mailer';
import { createElement } from 'react';
import { SendEmailDto } from './dto';
import { ResetPasswordTemplate, VerificationEmailTemplate } from './templates';
import { BaseEmailProps } from './templates/base-email-props.types';
import RestoreAccountTemplate from './templates/restore-account.template';

@Injectable()
export class MailService {
	private readonly transport: ReturnType<typeof getMailerConfig>;
	private readonly DOMAIN: string;
	private readonly ICON_URL: string;

	constructor(private readonly configService: ConfigService) {
		this.DOMAIN = this.configService.getOrThrow<string>('APP_URL');
		this.ICON_URL = this.configService.getOrThrow<string>('ICON_URL');
		this.transport = getMailerConfig(configService);
	}

	async sendVerificationEmail(email: string, token: string) {
		const url = `/email-verify?token=${token}`;
		const html = await this.generateTemplate(VerificationEmailTemplate, url);

		return await this.sendMail({
			recipients: [email],
			subject: 'Please verify your email address',
			html,
		});
	}

	async sendPasswordResetEmail(email: string, token: string) {
		const url = `/reset-password?token=${token}`;
		const html = await this.generateTemplate(ResetPasswordTemplate, url);

		return await this.sendMail({
			recipients: [email],
			subject: 'Reset your password',
			html: html,
		});
	}

	async sendRestoreAccountEmail(email: string, token: string) {
		const url = `/restore?token=${token}`;
		const html = await this.generateTemplate(RestoreAccountTemplate, url);

		return await this.sendMail({
			recipients: [email],
			subject: 'Restore your account',
			html: html,
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

	private async generateTemplate(
		template: React.ComponentType<BaseEmailProps>,
		url: string,
	) {
		const html = await render(
			createElement(template, {
				url: `${this.DOMAIN}${url}`,
				iconUrl: this.ICON_URL,
			}),
		);

		return html;
	}
}
