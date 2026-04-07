import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from 'generated/prisma/enums';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
	let controller: UserController;
	let service: UserService;

	const user = {
		id: 'user-id',
		email: 'user@gmail.com',
		password: 'hashedPassword123',
		emailVerified: false,
		role: UserRole.USER,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				UserService,
				{
					provide: UserService,
					useValue: {
						update: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<UserController>(UserController);
		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('update', () => {
		it('should call userService.update with correct parameters', async () => {
			const userId = 'user-id-123';
			const updateDto = {
				email: 'updated@gmail.com',
				emailVerified: true,
				role: UserRole.ADMIN,
			};

			const updateSpy = jest
				.spyOn(service, 'update')
				.mockResolvedValueOnce(
					user as unknown as Awaited<ReturnType<UserService['update']>>,
				);

			await controller.update(userId, updateDto);

			expect(updateSpy).toHaveBeenCalledWith(userId, updateDto);
		});

		it('should return error when email is not valid', async () => {
			const userId = 'user-id-123';

			const updateDto = {
				email: 'invalid-email@email.com',
				emailVerified: true,
				role: UserRole.ADMIN,
			};

			jest
				.spyOn(service, 'update')
				.mockRejectedValueOnce(
					new Error('Invalid email format. Only gmail.com is allowed.'),
				);

			await expect(controller.update(userId, updateDto)).rejects.toThrow(
				'Invalid email format. Only gmail.com is allowed.',
			);
		});
	});
});
