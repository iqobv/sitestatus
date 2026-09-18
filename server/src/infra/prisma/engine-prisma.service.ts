import { databaseEnvSchema } from '@config/schemas/database.schema';
import { PrismaClient } from '@generated/engine/client';
import { EnvService } from '@infra/env/env.service';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class EnginePrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor(private readonly envService: EnvService) {
		const config = envService.getGroup(databaseEnvSchema);

		const connectionString = config.ENGINE_DATABASE_URI;

		const cleanConnectionString = connectionString.split('?')[0];

		const pool = new Pool({
			connectionString: cleanConnectionString,
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
