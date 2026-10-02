import { z } from 'zod';

export const smtpEnvSchema = z.object({
	SMTP_HOST: z.string().nonempty('SMTP_HOST is required'),
	SMTP_PORT: z.coerce.number().int().positive(),
	SMTP_USER: z.string().nonempty('SMTP_USER is required'),
	SMTP_PASSWORD: z.string().nonempty('SMTP_PASSWORD is required'),
	MAIL_FROM_NAME: z.string().nonempty('MAIL_FROM_NAME is required'),
	MAIL_FROM_ADDRESS: z.email().nonempty('MAIL_FROM_ADDRESS is required'),
});

export type SmtpConfig = z.infer<typeof smtpEnvSchema>;
