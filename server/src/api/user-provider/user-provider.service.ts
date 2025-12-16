import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateUserProviderDto } from './dto';

@Injectable()
export class UserProviderService {
	constructor(private readonly prismaService: PrismaService) {}

	async findByProviderAndProviderId(provider: string, providerId: string) {
		return this.prismaService.userProvider.findUnique({
			where: { provider_providerId: { provider, providerId } },
			include: { user: true },
		});
	}

	async findByUserIdAndProvider(userId: string, provider: string) {
		return this.prismaService.userProvider.findUnique({
			where: { userId_provider: { userId, provider } },
			include: { user: true },
		});
	}

	async create(dto: CreateUserProviderDto) {
		const { provider, providerId, userId } = dto;

		const existingByUserAndProvider = await this.findByUserIdAndProvider(
			userId,
			provider,
		);

		if (existingByUserAndProvider) return existingByUserAndProvider;

		const existingUserProvider = await this.findByProviderAndProviderId(
			provider,
			providerId,
		);

		if (existingUserProvider) return existingUserProvider;

		const userProvider = await this.prismaService.userProvider.create({
			data: {
				provider,
				providerId,
				user: { connect: { id: userId } },
			},
		});

		return userProvider;
	}
}
