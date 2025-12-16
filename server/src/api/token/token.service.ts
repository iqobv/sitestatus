import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { TokenType } from 'generated/prisma/enums';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { comparePassword, hashPassword } from 'src/libs/utils';
import { CreateTokenDto } from './dto';

@Injectable()
export class TokenService {
	constructor(private readonly prismaService: PrismaService) {}

	async createToken(dto: CreateTokenDto) {
		const { userId, type, expiresAt, isSelector } = dto;

		let selector: string | null = null;

		const validator = crypto.randomBytes(32).toString('hex');
		const hashedValidator = await hashPassword(validator);

		if (type === TokenType.EMAIL_VERIFICATION) {
			await this.prismaService.token.deleteMany({
				where: { userId, type: TokenType.EMAIL_VERIFICATION },
			});
		}

		if (type === TokenType.RESET_PASSWORD) {
			await this.prismaService.token.deleteMany({
				where: { userId, type: TokenType.RESET_PASSWORD },
			});
		}

		if (isSelector) selector = crypto.randomBytes(16).toString('hex');

		await this.prismaService.token.create({
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

	async validateTokenForUser(userId: string, token: string, type: TokenType) {
		const tokens = await this.prismaService.token.findMany({
			where: { userId, type, expiresAt: { gt: new Date() } },
		});

		if (!tokens.length) return false;

		for (const dbToken of tokens) {
			const isValid = await comparePassword(token, dbToken.hashedValidator);
			if (isValid) return true;
		}

		return false;
	}

	async validateTokenWithSelector(
		fullToken: string,
		type: TokenType,
		deleteToken: boolean = false,
	): Promise<string | null> {
		const [selector, validator] = fullToken.split(':');
		if (!selector || !validator) return null;

		const dbToken = await this.prismaService.token.findUnique({
			where: {
				selector_type: { selector, type },
				expiresAt: { gt: new Date() },
			},
		});

		if (!dbToken || dbToken.expiresAt < new Date()) return null;

		const isValid = await comparePassword(validator, dbToken.hashedValidator);
		if (!isValid) return null;

		if (deleteToken) {
			await this.prismaService.token.delete({ where: { id: dbToken.id } });
		}

		return dbToken.userId;
	}

	async removeTokenWithSelector(
		userId: string,
		fullToken: string,
		type: TokenType,
	): Promise<void> {
		const [selector, validator] = fullToken.split(':');
		if (!selector || !validator) return;

		const dbToken = await this.prismaService.token.findUnique({
			where: {
				userId,
				selector_type: { selector, type },
			},
		});

		if (!dbToken) return;

		await this.prismaService.token.delete({ where: { id: dbToken.id } });
	}

	async removeToken(
		userId: string,
		token: string,
		type: TokenType,
	): Promise<void> {
		const userTokens = await this.prismaService.token.findMany({
			where: {
				userId,
				type,
			},
		});

		if (!userTokens.length) return;

		for (const dbToken of userTokens) {
			const isValid = await comparePassword(token, dbToken.hashedValidator);
			if (isValid) {
				await this.prismaService.token.delete({
					where: { id: dbToken.id },
				});
				break;
			}
		}
	}

	async removeAllForUser(userId: string, type: TokenType) {
		return this.prismaService.token.deleteMany({
			where: { userId, type },
		});
	}
}
