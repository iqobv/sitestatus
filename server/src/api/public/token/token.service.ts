import { BadRequestException, Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { Prisma } from 'generated/prisma/client';
import { TokenType } from 'generated/prisma/enums';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ERROR_MESSAGES } from 'src/libs/constants';
import { userSelect } from 'src/libs/prisma';
import { CreateTokenDto } from './dto';

@Injectable()
export class TokenService {
	constructor(private readonly prismaService: PrismaService) {}

	async createToken(
		dto: CreateTokenDto,
		tx?: Prisma.TransactionClient,
	): Promise<string> {
		const { userId, type, expiresAt } = dto;
		const prisma = tx ?? this.prismaService;

		await prisma.token.deleteMany({
			where: { userId, type },
		});

		const token = crypto.randomBytes(32).toString('hex');
		const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

		await prisma.token.create({
			data: {
				token: hashedToken,
				type,
				userId,
				expiresAt,
			},
		});

		return token;
	}

	async verifyAndConsumeToken(
		token: string,
		type: TokenType,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		console.log(token);

		const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

		const record = await prisma.token.findUnique({
			where: { token: hashedToken },
			include: { user: { select: userSelect } },
		});

		console.log(await prisma.token.findMany());

		console.log(record);

		if (!record || record.type !== type) {
			throw new BadRequestException(ERROR_MESSAGES.TOKEN.TOKEN_INVALID);
		}

		if (record.expiresAt < new Date()) {
			await prisma.token.delete({ where: { id: record.id } });
			throw new BadRequestException(ERROR_MESSAGES.TOKEN.TOKEN_EXPIRED);
		}

		await prisma.token.delete({ where: { id: record.id } });

		return { ...record.user };
	}
}
