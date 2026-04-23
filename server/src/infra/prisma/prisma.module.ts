import { Global, Module } from '@nestjs/common';
import { PgPrismaService } from './pg-prisma.service';
import { TursoPrismaService } from './turso-prisma.service';

@Global()
@Module({
	exports: [PgPrismaService, TursoPrismaService],
	providers: [PgPrismaService, TursoPrismaService],
})
export class PrismaModule {}
