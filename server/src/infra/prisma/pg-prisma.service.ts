import { databaseEnvSchema } from '@config/schemas/database.schema';
import { PrismaClient } from '@generated/postgres/client';
import { EnvService } from '@infra/env/env.service';
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

		const cleanConnectionString = connectionString.split('?')[0];

		const pool = new Pool({
			connectionString: cleanConnectionString,
			ssl: false,
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
