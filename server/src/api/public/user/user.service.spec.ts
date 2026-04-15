import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from 'generated/prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { userSelect } from 'src/libs/prisma';
import { hashPassword } from 'src/libs/utils';
import { UserService } from './user.service';

type PrismaMock = {
	user: {
		create: jest.Mock;
		findUnique: jest.Mock;
		update: jest.Mock;
	};
};

jest.mock('src/libs/utils', () => ({
	hashPassword: jest.fn(),
}));

describe('UserService', () => {
	let service: UserService;
	let prisma: PrismaMock;

	const user = {
		id: 'user-id',
		email: 'user@example.com',
		password: 'hashedPassword123',
		emailVerified: false,
		role: UserRole.USER,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(async () => {
		prisma = {
			user: {
				create: jest.fn(),
				findUnique: jest.fn(),
				update: jest.fn(),
			},
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: PrismaService,
					useValue: prisma,
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);

		jest.clearAllMocks();
		(hashPassword as jest.Mock).mockResolvedValue('hashedPassword123');
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create a user', async () => {
			prisma.user.findUnique.mockResolvedValue(null);
			prisma.user.create.mockResolvedValue(user);

			const dto = { email: 'user@example.com', password: 'password' };

			const result = await service.create(dto);

			expect(prisma.user.findUnique).toHaveBeenCalledWith({
				where: { email: dto.email },
				select: userSelect,
			});
			expect(hashPassword).toHaveBeenCalledWith(dto.password);
			expect(prisma.user.create).toHaveBeenCalledWith({
				data: {
					email: dto.email,
					password: 'hashedPassword123',
				},
				select: userSelect,
			});
			expect(result).toEqual(user);
		});

		it('should throw ConflictException if user already exists', async () => {
			prisma.user.findUnique.mockResolvedValue(user);

			const dto = { email: 'user@example.com', password: 'password' };

			await expect(service.create(dto)).rejects.toThrow('User already exists');

			expect(prisma.user.findUnique).toHaveBeenCalledWith({
				where: { email: dto.email },
				select: userSelect,
			});
			expect(prisma.user.create).not.toHaveBeenCalled();
		});
	});

	describe('findById', () => {
		it('should find a user by ID without password', async () => {
			prisma.user.findUnique.mockResolvedValue(user);

			const result = await service.findById('user-id');

			expect(prisma.user.findUnique).toHaveBeenCalledWith({
				where: { id: 'user-id' },
				select: {
					...userSelect,
				},
			});
			expect(result).toEqual(user);
		});

		it('should return a user by ID with password when specified', async () => {
			const userWithPassword = { ...user, password: 'hashedPassword123' };
			prisma.user.findUnique.mockResolvedValue(userWithPassword);

			const result = await service.findById('user-id', true);

			expect(prisma.user.findUnique).toHaveBeenCalledWith({
				where: { id: 'user-id' },
				select: {
					...userSelect,
					password: true,
				},
			});
			expect(result).toEqual(userWithPassword);
		});
	});

	describe('findByEmail', () => {
		it('should find a user by email without password', async () => {
			prisma.user.findUnique.mockResolvedValue(user);

			const result = await service.findByEmail('user@example.com');
			expect(prisma.user.findUnique).toHaveBeenCalledWith({
				where: { email: 'user@example.com' },
				select: {
					...userSelect,
				},
			});
			expect(result).toEqual(user);
		});

		it('should find a user by email with password', async () => {
			const userWithPassword = { ...user, password: 'hashedPassword123' };
			prisma.user.findUnique.mockResolvedValue(userWithPassword);

			const result = await service.findByEmail('user@example.com', true);

			expect(prisma.user.findUnique).toHaveBeenCalledWith({
				where: { email: 'user@example.com' },
				select: {
					...userSelect,
					password: true,
				},
			});
			expect(result).toEqual(userWithPassword);
		});
	});

	describe('update', () => {
		it('should update a user', async () => {
			const updatedUser = { ...user, email: 'updated@example.com' };

			const findByIdSpy = jest
				.spyOn(service, 'findById')
				.mockResolvedValue(
					user as unknown as Awaited<ReturnType<UserService['findById']>>,
				);
			prisma.user.findUnique.mockResolvedValue(null);
			prisma.user.update.mockResolvedValue(updatedUser);

			const dto = { email: 'updated@example.com' };

			const result = await service.update('user-id', dto);

			expect(findByIdSpy).toHaveBeenCalledWith('user-id');
			expect(prisma.user.findUnique).toHaveBeenCalledWith({
				where: { email: dto.email },
				select: userSelect,
			});
			expect(prisma.user.update).toHaveBeenCalledWith({
				where: { id: user.id },
				data: {
					email: dto.email,
					emailVerified: undefined,
					role: undefined,
				},
				select: userSelect,
			});
			expect(result).toEqual(updatedUser);
		});

		it('should throw ConflictException if updating to an existing email', async () => {
			const existingUser = { ...user, id: 'other-user-id' };

			const findByIdSpy = jest
				.spyOn(service, 'findById')
				.mockResolvedValue(
					user as unknown as Awaited<ReturnType<UserService['findById']>>,
				);
			prisma.user.findUnique.mockResolvedValue(existingUser);

			const dto = { email: 'existing@example.com' };
			await expect(service.update('user-id', dto)).rejects.toThrow(
				'User already exists',
			);
			expect(findByIdSpy).toHaveBeenCalledWith('user-id');
			expect(prisma.user.findUnique).toHaveBeenCalledWith({
				where: { email: dto.email },
				select: userSelect,
			});
			expect(prisma.user.update).not.toHaveBeenCalled();
		});
	});
});
