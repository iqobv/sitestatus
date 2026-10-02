import { z } from 'zod';

export const databaseEnvSchema = z.object({
	POSTGRES_URI: z.string().nonempty('POSTGRES_URI is required'),
	POSTGRES_DB: z.string().nonempty('POSTGRES_DB is required'),
	POSTGRES_HOST: z.string().nonempty('POSTGRES_HOST is required'),
	POSTGRES_PASSWORD: z.string().nonempty('POSTGRES_PASSWORD is required'),
	POSTGRES_USER: z.string().nonempty('POSTGRES_USER is required'),
	ENGINE_DB_USER: z.string().nonempty('ENGINE_DB_USER is required'),
	ENGINE_DB_PASSWORD: z.string().nonempty('ENGINE_DB_PASSWORD is required'),
	ENGINE_DB_NAME: z.string().nonempty('ENGINE_DB_NAME is required'),
	ENGINE_DATABASE_URI: z.string().nonempty('ENGINE_DATABASE_URI is required'),
});

export type DatabaseConfig = z.infer<typeof databaseEnvSchema>;
