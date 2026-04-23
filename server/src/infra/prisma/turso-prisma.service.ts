import { PrismaClient } from '@generated/turso/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaLibSql } from '@prisma/adapter-libsql';

@Injectable()
export class TursoPrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor(private readonly configService: ConfigService) {
		const url = configService.getOrThrow<string>('TURSO_DATABASE_URL');
		const authToken = configService.getOrThrow<string>('TURSO_AUTH_TOKEN');

		if (!url) {
			throw new Error(
				'TURSO_DATABASE_URL is not defined in environment variables',
			);
		}

		const adapter = new PrismaLibSql({
			url,
			authToken,
		});

		super({ adapter });
	}

	async onModuleInit() {
		await this.$connect();
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}
