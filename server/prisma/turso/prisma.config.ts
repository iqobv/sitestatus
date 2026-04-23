import { defineConfig, env } from '@prisma/config';
import 'dotenv/config';

export default defineConfig({
	schema: '.',
	migrations: {
		path: './migrations',
	},
	datasource: {
		url: env('TURSO_URI'),
	},
});
