import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	shared: {
		NODE_ENV: z
			.enum(['development', 'production', 'test'])
			.default('development'),
	},
	server: {
		API_URL: z.url().nonempty('API_URL is required'),
	},
	client: {
		NEXT_PUBLIC_CLIENT_URL: z
			.url()
			.nonempty('NEXT_PUBLIC_CLIENT_URL is required'),
		NEXT_PUBLIC_ROOT_DOMAIN: z
			.string()
			.nonempty('NEXT_PUBLIC_ROOT_DOMAIN is required'),
		NEXT_PUBLIC_PROTOCOL: z
			.enum(['http', 'https'])
			.default('https')
			.transform((protocol) => `${protocol}://`),
		NEXT_PUBLIC_API_URL: z.url().nonempty('NEXT_PUBLIC_API_URL is required'),
		NEXT_PUBLIC_GA_ID: z.string().nonempty('NEXT_PUBLIC_GA_ID is required'),
		NEXT_PUBLIC_COOKIE_DOMAIN: z
			.string()
			.nonempty('NEXT_PUBLIC_COOKIE_DOMAIN is required'),
		NEXT_PUBLIC_GOOGLE_CLIENT_ID: z
			.string()
			.nonempty('NEXT_PUBLIC_GOOGLE_CLIENT_ID is required'),
		NEXT_PUBLIC_STATUS_PAGE_URL: z
			.url()
			.nonempty('NEXT_PUBLIC_STATUS_PAGE_URL is required'),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		API_URL: process.env.API_URL,
		NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
		NEXT_PUBLIC_ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
		NEXT_PUBLIC_PROTOCOL: process.env.NEXT_PUBLIC_PROTOCOL,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
		NEXT_PUBLIC_COOKIE_DOMAIN: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
		NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
		NEXT_PUBLIC_STATUS_PAGE_URL: process.env.NEXT_PUBLIC_STATUS_PAGE_URL,
	},
});
