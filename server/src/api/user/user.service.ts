import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { userSelect } from 'src/libs/prisma/user-select.prisma';
import { hashPassword } from 'src/libs/utils';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(dto: CreateUserDto) {
		const { email, password } = dto;

		await this.alreadyExists(email);

		const hashedPassword = password ? await hashPassword(password) : null;

		const user = await this.prismaService.user.create({
			data: {
				email,
				password: hashedPassword,
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

	async findById(id: string, full: boolean = false) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			select: {
				...userSelect,
				...(full && { password: true }),
			},
		});

		if (!user) throw new NotFoundException('User not found');

		return user;
	}

	async findByEmail(email: string, full: boolean = false) {
		return this.prismaService.user.findUnique({
			where: { email },
			select: { ...userSelect, ...(full && { password: true }) },
		});
	}

	async update(id: string, dto: UpdateUserDto) {
		const { email, emailVerified, role } = dto;

		const user = await this.findById(id);

		if (email && email !== user.email) await this.alreadyExists(email);

		const updatedUser = await this.prismaService.user.update({
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

	private async alreadyExists(email: string) {
		const user = await this.findByEmail(email);

		if (user) throw new ConflictException('User already exists');
	}
}
