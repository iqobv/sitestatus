import { Prisma } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { hashToken } from '@libs/utils/hashToken.util';
import { isPrivateIP } from '@libs/utils/is-private.ip.util';
import { HttpService } from '@nestjs/axios';
import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { UAParser } from 'ua-parser-js';
import { AllSessionsDto } from './dto/all-sessions.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { GeoDataDto } from './dto/geo-data.dto';
import { SessionDto } from './dto/session.dto';
import { UserAgentDto } from './dto/user-agent.dto';

@Injectable()
export class SessionService {
	constructor(
		private readonly prismaService: PgPrismaService,
		private readonly httpService: HttpService,
	) {}

	public async createSession(
		dto: CreateSessionDto,
		tx?: Prisma.TransactionClient,
	): Promise<SessionDto> {
		const { clientInfo, expiresAt, refreshTokenHash, userId } = dto;
		const { ip, userAgent } = clientInfo;

		const prisma = tx ?? this.prismaService;

		const geo: GeoDataDto | null = isPrivateIP(ip)
			? null
			: await this.getGeoInfo(ip);

		const parsedUa = this.parseUserAgent(userAgent);

		return await prisma.session.create({
			data: {
				userId,
				refreshToken: refreshTokenHash,
				ip: clientInfo.ip,
				countryCode: geo?.countryCode,
				city: geo?.city,
				userAgent,
				expiresAt,
				...parsedUa,
			},
		});
	}

	public async rotateSession(
		sessionId: string,
		dto: CreateSessionDto,
		tx?: Prisma.TransactionClient,
	): Promise<SessionDto> {
		const { clientInfo, expiresAt, refreshTokenHash } = dto;
		const { ip, userAgent } = clientInfo;

		const prisma = tx ?? this.prismaService;

		const geo: GeoDataDto | null = isPrivateIP(ip)
			? null
			: await this.getGeoInfo(ip);

		const parsedUa = this.parseUserAgent(userAgent);

		return await prisma.session.update({
			where: { id: sessionId },
			data: {
				refreshToken: refreshTokenHash,
				ip,
				countryCode: geo?.countryCode,
				city: geo?.city,
				userAgent,
				expiresAt,
				...parsedUa,
			},
		});
	}

	public async findSessionById(sessionId: string): Promise<SessionDto> {
		const session = await this.prismaService.session.findUnique({
			where: { id: sessionId },
		});

		if (!session)
			throw new NotFoundException(ERROR_MESSAGES.SESSIONS.NOT_FOUND);

		return session;
	}

	public async getUserSessions(
		userId: string,
		refreshToken: string,
	): Promise<AllSessionsDto> {
		const allSessions = await this.prismaService.session.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
		});

		const currentSession = await this.getSessionByRefreshToken(
			userId,
			refreshToken,
		);

		const mappedSessions = allSessions.map(
			({ refreshToken: _rt, userAgent: _ua, ...rest }) => rest,
		);

		return {
			currentSession,
			otherSessions: mappedSessions.filter((s) => s.id !== currentSession.id),
		};
	}

	public async deleteSession(
		sessionId: string,
		userId: string,
	): Promise<MessageResponse> {
		const session = await this.findSessionById(sessionId);

		if (session.userId !== userId) {
			throw new ForbiddenException(ERROR_MESSAGES.SESSIONS.ACCESS_DENIED);
		}

		await this.prismaService.session.delete({
			where: { id: sessionId },
		});

		return SUCCESS_MESSAGES.SESSION.DELETED;
	}

	public async deleteAllOtherSessions(
		userId: string,
		refreshToken: string,
	): Promise<MessageResponse> {
		const currentSession = await this.getSessionByRefreshToken(
			userId,
			refreshToken,
		);

		await this.prismaService.session.deleteMany({
			where: {
				userId,
				id: { not: currentSession.id },
			},
		});

		return SUCCESS_MESSAGES.SESSION.ALL_OTHER_SESSIONS_DELETED;
	}

	private async getSessionByRefreshToken(
		userId: string,
		refreshToken: string,
	): Promise<SessionDto> {
		const refreshTokenHash = hashToken(refreshToken);

		const session = await this.prismaService.session.findFirst({
			where: { userId, refreshToken: refreshTokenHash },
		});

		if (!session)
			throw new NotFoundException(ERROR_MESSAGES.SESSIONS.NOT_FOUND);

		const { refreshToken: _rt, userAgent: _ua, ...rest } = session;

		return rest;
	}

	private parseUserAgent(userAgent: string): UserAgentDto {
		const parser = new UAParser(userAgent);

		const result = parser.getResult();

		return {
			device: result.device.type || 'desktop',
			os: result.os.name || 'Unknown OS',
			browser: result.browser.name || 'Unknown Browser',
		};
	}

	private async getGeoInfo(ip: string): Promise<GeoDataDto | null> {
		try {
			const response = await this.httpService.axiosRef.get<GeoDataDto>(
				`http://ip-api.com/json/${ip}?fields=countryCode,city,query`,
			);

			return response.data;
		} catch {
			return null;
		}
	}
}
