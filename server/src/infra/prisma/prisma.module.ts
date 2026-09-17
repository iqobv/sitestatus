import { Global, Module } from '@nestjs/common';
import { EnginePrismaService } from './engine-prisma.service';
import { PgPrismaService } from './pg-prisma.service';

@Global()
@Module({
	exports: [PgPrismaService, EnginePrismaService],
	providers: [PgPrismaService, EnginePrismaService],
})
export class PrismaModule {}
