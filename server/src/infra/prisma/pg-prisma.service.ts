import { databaseEnvSchema } from '@config/schemas/database.schema';
import { PrismaClient } from '@generated/postgres/client';
import { EnvService } from '@infra/env/env.service';
import { IS_PROD_ENV } from '@libs/utils/is-dev.util';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PgPrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor(private readonly envService: EnvService) {
		const config = envService.getGroup(databaseEnvSchema);

		const connectionString = config.POSTGRES_URI;
		const caCert = config.DB_CA_CERT_BASE64;
		const isProd = IS_PROD_ENV;

		const cleanConnectionString = connectionString.split('?')[0];

		const pool = new Pool({
			connectionString: cleanConnectionString,
			ssl:
				isProd && caCert
					? {
							ca: Buffer.from(caCert),
							rejectUnauthorized: true,
						}
					: undefined,
		});

		const adapter = new PrismaPg(pool);

		super({ adapter });
	}

	async onModuleInit() {
		await this.$connect();
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}
