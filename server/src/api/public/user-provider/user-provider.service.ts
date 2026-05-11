import { Prisma } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserProviderDto } from './dto';

@Injectable()
export class UserProviderService {
	constructor(private readonly prismaService: PgPrismaService) {}

	async findByProviderAndProviderId(
		provider: string,
		providerId: string,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		return await prisma.userProvider.findUnique({
			where: { provider_providerId: { provider, providerId } },
			include: { user: true },
		});
	}

	async findByUserIdAndProvider(
		userId: string,
		provider: string,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		return await prisma.userProvider.findUnique({
			where: { userId_provider: { userId, provider } },
			include: { user: true },
		});
	}

	async create(dto: CreateUserProviderDto, tx?: Prisma.TransactionClient) {
		const { provider, providerId, userId } = dto;

		const prisma = tx ?? this.prismaService;

		const existingByUserAndProvider = await this.findByUserIdAndProvider(
			userId,
			provider,
			tx,
		);

		if (existingByUserAndProvider) return existingByUserAndProvider;

		const existingUserProvider = await this.findByProviderAndProviderId(
			provider,
			providerId,
			tx,
		);

		if (existingUserProvider) return existingUserProvider;

		const userProvider = await prisma.userProvider.create({
			data: {
				provider,
				providerId,
				user: { connect: { id: userId } },
			},
		});

		return userProvider;
	}
}
