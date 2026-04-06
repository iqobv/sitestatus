import { BadRequestException, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Prisma } from 'generated/prisma/client';
import { TokenType } from 'generated/prisma/enums';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ERROR_MESSAGES } from 'src/libs/constants';
import { compareValidators, hashValidator } from 'src/libs/utils';
import { CreateTokenDto } from './dto';

@Injectable()
export class TokenService {
	constructor(private readonly prismaService: PrismaService) {}

	async createToken(
		dto: CreateTokenDto,
		tx?: Prisma.TransactionClient,
	): Promise<string> {
		const { userId, type, expiresAt, isSelector } = dto;
		const prisma = tx ?? this.prismaService;

		let selector: string | null = null;
		const validator = crypto.randomBytes(32).toString('hex');
		const hashedValidator = hashValidator(validator);

		if (
			type === TokenType.EMAIL_VERIFICATION ||
			type === TokenType.RESET_PASSWORD
		) {
			await prisma.token.deleteMany({
				where: { userId, type },
			});
		}

		if (isSelector) {
			selector = crypto.randomBytes(16).toString('hex');
		}

		await prisma.token.create({
			data: {
				user: { connect: { id: userId } },
				type,
				selector,
				hashedValidator,
				expiresAt,
			},
		});

		return isSelector ? `${selector}:${validator}` : validator;
	}

	async validateTokenForUser(
		userId: string,
		token: string,
		type: TokenType,
		tx?: Prisma.TransactionClient,
	): Promise<boolean> {
		const prisma = tx ?? this.prismaService;
		const tokens = await prisma.token.findMany({
			where: { userId, type, expiresAt: { gt: new Date() } },
		});

		if (tokens.length === 0) {
			return false;
		}

		for (const dbToken of tokens) {
			if (compareValidators(token, dbToken.hashedValidator)) {
				return true;
			}
		}

		return false;
	}

	async validateTokenWithSelector(
		fullToken: string,
		type: TokenType,
		deleteToken: boolean = false,
		tx?: Prisma.TransactionClient,
	): Promise<string> {
		const prisma = tx ?? this.prismaService;
		const [selector, validator] = fullToken.split(':');

		if (!selector || !validator) {
			throw new BadRequestException(ERROR_MESSAGES.TOKEN.TOKEN_INVALID);
		}

		const dbToken = await prisma.token.findUnique({
			where: {
				selector_type: { selector, type },
			},
		});

		if (!dbToken) {
			throw new BadRequestException(ERROR_MESSAGES.TOKEN.TOKEN_NOT_FOUND);
		}

		if (dbToken.expiresAt < new Date()) {
			if (deleteToken) {
				await prisma.token.delete({ where: { id: dbToken.id } });
			}
			throw new BadRequestException(ERROR_MESSAGES.TOKEN.TOKEN_EXPIRED);
		}

		const isValid = compareValidators(validator, dbToken.hashedValidator);
		if (!isValid) {
			throw new BadRequestException(ERROR_MESSAGES.TOKEN.TOKEN_INVALID);
		}

		if (deleteToken) {
			await prisma.token.delete({ where: { id: dbToken.id } });
		}

		return dbToken.userId;
	}

	async removeTokenWithSelector(
		userId: string,
		fullToken: string,
		type: TokenType,
		tx?: Prisma.TransactionClient,
	): Promise<void> {
		const prisma = tx ?? this.prismaService;
		const [selector, validator] = fullToken.split(':');

		if (!selector || !validator) {
			return;
		}

		const dbToken = await prisma.token.findUnique({
			where: {
				userId,
				selector_type: { selector, type },
			},
		});

		if (!dbToken) {
			return;
		}

		const isValid = compareValidators(validator, dbToken.hashedValidator);

		if (!isValid) {
			return;
		}

		await prisma.token.delete({
			where: { id: dbToken.id },
		});
	}

	async removeToken(
		userId: string,
		token: string,
		type: TokenType,
		tx?: Prisma.TransactionClient,
	): Promise<void> {
		const prisma = tx ?? this.prismaService;
		const userTokens = await prisma.token.findMany({
			where: { userId, type },
		});

		if (userTokens.length === 0) {
			return;
		}

		for (const dbToken of userTokens) {
			if (compareValidators(token, dbToken.hashedValidator)) {
				await prisma.token.delete({
					where: { id: dbToken.id },
				});
				break;
			}
		}
	}

	async removeAllForUser(
		userId: string,
		type: TokenType,
		tx?: Prisma.TransactionClient,
	): Promise<void> {
		const prisma = tx ?? this.prismaService;
		await prisma.token.deleteMany({
			where: { userId, type },
		});
	}
}
