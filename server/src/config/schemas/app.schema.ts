import { z } from 'zod';

export const appEnvSchema = z.object({
	PORT: z.coerce.number().default(5000),
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	MAIN_URL: z.url().nonempty('MAIN_URL is required'),
	APP_URL: z.url().nonempty('APP_URL is required'),
	STATUS_URL: z.url().nonempty('STATUS_URL is required'),
	ICON_URL: z.url().nonempty('ICON_URL is required'),
	WORKER_SECRET_KEY: z.string().nonempty('WORKER_SECRET_KEY is required'),
	SERVICE_BUS_CONNECTION_STRING: z
		.string()
		.nonempty('SERVICE_BUS_CONNECTION_STRING is required'),
	ADMIN_DOCS_URL: z.url().nonempty('ADMIN_DOCS_URL is required'),
	ADMIN_DOCS_USER: z.string().nonempty('ADMIN_DOCS_USER is required'),
	ADMIN_DOCS_PASSWORD: z.string().nonempty('ADMIN_DOCS_PASSWORD is required'),
});

export type AppConfig = z.infer<typeof appEnvSchema>;
