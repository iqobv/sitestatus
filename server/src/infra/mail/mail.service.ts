import { getMailerConfig } from '@config/mailer.config';
import { smtpEnvSchema } from '@config/schemas/smtp.schema';
import { SiteStatus } from '@generated/engine/enums';
import { EnvService } from '@infra/env/env.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { render } from '@react-email/components';
import type { SendMailOptions, SentMessageInfo } from 'nodemailer';
import { createElement } from 'react';
import { IncidentAlertDto } from './dto/incident-alert.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { BaseEmailProps } from './templates/base-email-props.types';
import { EmailNotificationChannelVerifyTemplate } from './templates/email-notification-channel-verify.template';
import { MonitorDownTemplate } from './templates/monitor-down.template';
import { MonitorUpTemplate } from './templates/monitor-up.template';
import { ResetPasswordTemplate } from './templates/reset-password.template';
import { RestoreAccountTemplate } from './templates/restore-account.template';
import { VerificationEmailTemplate } from './templates/verification-email.template';

@Injectable()
export class MailService {
	private readonly transport: ReturnType<typeof getMailerConfig>;
	private readonly domain: string;
	private readonly iconUrl: string;
	private readonly defaultFromName: string;
	private readonly defaultFromAddress: string;

	constructor(private readonly envService: EnvService) {
		const config = envService.getGroup(smtpEnvSchema);

		this.domain = envService.get('APP_URL');
		this.iconUrl = envService.get('ICON_URL');
		this.defaultFromName = config.MAIL_FROM_NAME;
		this.defaultFromAddress = config.MAIL_FROM_ADDRESS;
		this.transport = getMailerConfig(config);
	}

	public async sendVerificationEmail(
		email: string,
		token: string,
	): Promise<SentMessageInfo> {
		const url = `/email-verify?token=${token}`;
		const html = await this.generateTemplate(VerificationEmailTemplate, url);

		return this.sendMail({
			recipients: [email],
			subject: 'Please verify your email address',
			html,
		});
	}

	public async sendPasswordResetEmail(
		email: string,
		token: string,
	): Promise<SentMessageInfo> {
		const url = `/reset-password?token=${token}`;
		const html = await this.generateTemplate(ResetPasswordTemplate, url);

		return this.sendMail({
			recipients: [email],
			subject: 'Reset your password',
			html,
		});
	}

	public async sendRestoreAccountEmail(
		email: string,
		token: string,
	): Promise<SentMessageInfo> {
		const url = `/restore?token=${token}`;
		const html = await this.generateTemplate(RestoreAccountTemplate, url);

		return this.sendMail({
			recipients: [email],
			subject: 'Restore your account',
			html,
		});
	}

	public async sendEmailNotificationChannelVerify(
		email: string,
		token: string,
	): Promise<SentMessageInfo> {
		const url = `/verify-channel?token=${token}`;
		const html = await this.generateTemplate(
			EmailNotificationChannelVerifyTemplate,
			url,
		);

		return this.sendMail({
			recipients: [email],
			subject: 'Verify your email address',
			html,
		});
	}

	public async sendIncidentAlert(
		email: string,
		dto: IncidentAlertDto,
	): Promise<SentMessageInfo> {
		const { incidentId, monitorId, status } = dto;
		const url = `/monitors/${monitorId}/incidents/${incidentId}`;
		const template =
			status === SiteStatus.UP ? MonitorUpTemplate : MonitorDownTemplate;
		const html = await this.generateTemplate(template, url, { incident: dto });

		return this.sendMail({
			recipients: [email],
			subject: 'Incident alert',
			html,
		});
	}

	public async sendMail(dto: SendEmailDto): Promise<SentMessageInfo> {
		const { from, recipients, subject, html } = dto;

		const options: SendMailOptions = {
			from: from ?? `"${this.defaultFromName}" <${this.defaultFromAddress}>`,
			to: recipients,
			subject,
			html,
		};

		try {
			return await this.transport.sendMail(options);
		} catch {
			throw new InternalServerErrorException('Email delivery failed');
		}
	}

	private async generateTemplate<TProps extends BaseEmailProps>(
		template: React.ComponentType<TProps>,
		url: string,
		props?: Omit<TProps, keyof BaseEmailProps>,
	): Promise<string> {
		const componentProps = {
			url: `${this.domain}${url}`,
			iconUrl: this.iconUrl,
			...props,
		} as TProps;

		return render(createElement(template, componentProps));
	}
}
