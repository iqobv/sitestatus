import { Prisma } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import { userSelect } from '@libs/prisma/user-select.prisma';
import { hashPassword } from '@libs/utils';
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PgPrismaService) {}

	async create(dto: CreateUserDto, tx?: Prisma.TransactionClient) {
		const { email, password } = dto;

		const prisma = tx || this.prismaService;

		await this.alreadyExists(email, tx);

		const countOfUsers = await prisma.user.count();
		const isAdmin = countOfUsers === 0;

		const hashedPassword = password ? await hashPassword(password) : null;

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				role: isAdmin ? 'ADMIN' : 'USER',
			},
			select: userSelect,
		});

		return user;
	}

	async createOauthUser(email: string) {
		await this.alreadyExists(email);

		const user = await this.prismaService.user.create({
			data: {
				email,
				emailVerified: true,
			},
			select: userSelect,
		});

		return user;
	}

	async findById(
		id: string,
		full: boolean = false,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;
		const user = await prisma.user.findUnique({
			where: { id },
			select: {
				...userSelect,
				...(full && { password: true }),
			},
		});

		if (!user) throw new NotFoundException(ERROR_MESSAGES.USER.USER_NOT_FOUND);

		return user;
	}

	async findByEmail(
		email: string,
		full: boolean = false,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;
		return prisma.user.findUnique({
			where: { email },
			select: { ...userSelect, ...(full && { password: true }) },
		});
	}

	async update(id: string, dto: UpdateUserDto, tx?: Prisma.TransactionClient) {
		const prisma = tx ?? this.prismaService;

		const { email, emailVerified, role } = dto;

		const user = await this.findById(id);

		if (email && email !== user.email) await this.alreadyExists(email, tx);

		const updatedUser = await prisma.user.update({
			where: { id: user.id },
			data: {
				email,
				emailVerified,
				role,
			},
			select: userSelect,
		});

		return updatedUser;
	}

	private async alreadyExists(email: string, tx?: Prisma.TransactionClient) {
		const prisma = tx ?? this.prismaService;
		const user = await prisma.user.findUnique({ where: { email } });

		if (user)
			throw new ConflictException(ERROR_MESSAGES.USER.USER_ALREADY_EXISTS);
	}
}
