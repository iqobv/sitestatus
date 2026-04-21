import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ERROR_MESSAGES } from 'src/libs/constants';
import { CreateSessionDto } from './dto';

@Injectable()
export class SessionService {
	constructor(private readonly prismaService: PrismaService) {}

	async createSession(dto: CreateSessionDto, tx?: Prisma.TransactionClient) {
		const { clientInfo, expiresAt, refreshTokenHash, userId } = dto;

		const prisma = tx ?? this.prismaService;

		return prisma.session.create({
			data: {
				userId,
				refreshToken: refreshTokenHash,
				ip: clientInfo.ip,
				country: clientInfo.country,
				city: clientInfo.city,
				userAgent: clientInfo.userAgent,
				expiresAt,
			},
		});
	}

	async findSessionById(sessionId: string) {
		const session = await this.prismaService.session.findUnique({
			where: { id: sessionId },
		});

		if (!session) {
			throw new NotFoundException(ERROR_MESSAGES.SESSIONS.SESSION_NOT_FOUND);
		}

		return session;
	}

	async getUserSessions(userId: string) {
		return this.prismaService.session.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
			select: {
				id: true,
				ip: true,
				country: true,
				city: true,
				userAgent: true,
				createdAt: true,
				expiresAt: true,
			},
		});
	}

	async deleteSession(sessionId: string, userId: string) {
		const session = await this.findSessionById(sessionId);

		if (session.userId !== userId) {
			throw new ForbiddenException(ERROR_MESSAGES.SESSIONS.ACCESS_DENIED);
		}

		await this.prismaService.session.delete({
			where: { id: sessionId },
		});
	}

	async deleteAllOtherSessions(currentSessionId: string, userId: string) {
		await this.prismaService.session.deleteMany({
			where: {
				userId,
				id: { not: currentSessionId },
			},
		});
	}
}
