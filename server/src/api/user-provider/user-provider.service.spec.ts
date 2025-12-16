import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UserProviderService } from './user-provider.service';

type PrismaMock = {
	userProvider: {
		findUnique: jest.Mock;
		create: jest.Mock;
	};
};

describe('UserProviderService', () => {
	let service: UserProviderService;
	let prisma: PrismaMock;

	const userProvider = {
		userId: 'user-123',
		provider: 'google',
		providerId: 'google-123',
	};

	beforeEach(async () => {
		prisma = {
			userProvider: {
				findUnique: jest.fn(),
				create: jest.fn(),
			},
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserProviderService,
				{
					provide: PrismaService,
					useValue: prisma,
				},
			],
		}).compile();

		service = module.get<UserProviderService>(UserProviderService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create a new user provider if none exists', async () => {
			const dto = {
				provider: 'google',
				providerId: 'google-123',
				userId: 'user-123',
			};

			prisma.userProvider.findUnique.mockResolvedValueOnce(null);

			prisma.userProvider.create.mockResolvedValue(userProvider);

			const result = await service.create(dto);

			expect(prisma.userProvider.findUnique).toHaveBeenCalledTimes(2);
			expect(prisma.userProvider.create).toHaveBeenCalledWith({
				data: {
					provider: dto.provider,
					providerId: dto.providerId,
					user: { connect: { id: dto.userId } },
				},
			});
			expect(result).toEqual(userProvider);
		});

		it('should return existing user provider if found by userId and provider', async () => {
			const dto = {
				provider: 'google',
				providerId: 'google-123',
				userId: 'user-123',
			};

			prisma.userProvider.findUnique.mockResolvedValueOnce(userProvider);

			const result = await service.create(dto);

			expect(prisma.userProvider.findUnique).toHaveBeenCalledTimes(1);
			expect(prisma.userProvider.create).not.toHaveBeenCalled();
			expect(result).toEqual(userProvider);
		});

		it('should return existing user provider if found by provider and providerId', async () => {
			const dto = {
				provider: 'google',
				providerId: 'google-123',
				userId: 'user-123',
			};

			prisma.userProvider.findUnique
				.mockResolvedValueOnce(null)
				.mockResolvedValueOnce(userProvider);

			const result = await service.create(dto);

			expect(prisma.userProvider.findUnique).toHaveBeenCalledTimes(2);
			expect(prisma.userProvider.create).not.toHaveBeenCalled();
			expect(result).toEqual(userProvider);
		});
	});

	describe('findByProviderAndProviderId', () => {
		it('should find user provider by provider and providerId', async () => {
			prisma.userProvider.findUnique.mockResolvedValue(userProvider);

			const result = await service.findByProviderAndProviderId(
				'google',
				'google-123',
			);

			expect(prisma.userProvider.findUnique).toHaveBeenCalledWith({
				where: {
					provider_providerId: { provider: 'google', providerId: 'google-123' },
				},
				include: { user: true },
			});
			expect(result).toEqual(userProvider);
		});
	});

	describe('findByUserIdAndProvider', () => {
		it('should find user provider by userId and provider', async () => {
			prisma.userProvider.findUnique.mockResolvedValue(userProvider);

			const reset = await service.findByUserIdAndProvider('user-123', 'google');

			expect(prisma.userProvider.findUnique).toHaveBeenCalledWith({
				where: { userId_provider: { userId: 'user-123', provider: 'google' } },
				include: { user: true },
			});
			expect(reset).toEqual(userProvider);
		});
	});
});
