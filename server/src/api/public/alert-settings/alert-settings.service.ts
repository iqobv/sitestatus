import { Prisma } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlertSettingsDto } from './dto';

@Injectable()
export class AlertSettingsService {
	constructor(private readonly prismaService: PgPrismaService) {}

	async createAlertSettings(
		userId: string,
		dto: CreateAlertSettingsDto,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		return await prisma.alertSettings.create({
			data: {
				userId,
				...dto,
			},
		});
	}

	async getEffectiveSettings(monitorId: string) {
		const monitor = await this.prismaService.monitor.findUnique({
			where: { id: monitorId, isActive: true, deletedAt: null },
			select: { id: true, userId: true, projectId: true },
		});

		if (!monitor)
			throw new NotFoundException(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND);

		const settings = await this.prismaService.alertSettings.findMany({
			where: {
				OR: [
					{ monitorId: monitor.id },
					{ projectId: monitor.projectId, monitorId: null },
					{ userId: monitor.userId, projectId: null, monitorId: null },
				],
			},
			include: {
				channels: {
					where: {
						isActive: true,
						status: 'VERIFIED',
					},
				},
			},
		});

		const monitorLevel = settings.find((s) => s.monitorId === monitor.id);
		if (monitorLevel) return monitorLevel;

		const projectLevel = settings.find(
			(s) => s.projectId === monitor.projectId && s.monitorId === null,
		);
		if (projectLevel) return projectLevel;

		const userLevel = settings.find(
			(s) =>
				s.userId === monitor.userId &&
				s.projectId === null &&
				s.monitorId === null,
		);
		if (userLevel) return userLevel;

		return null;
	}

	async upsertSettings(userId: string, dto: CreateAlertSettingsDto) {
		const { monitorId, projectId, channelIds } = dto;

		const searchData = {
			userId,
			projectId: projectId ?? null,
			monitorId: monitorId ?? null,
		};

		const existingSetting = await this.prismaService.alertSettings.findFirst({
			where: searchData,
			select: { id: true },
		});

		const setting = await this.prismaService.alertSettings.upsert({
			where: { id: existingSetting?.id },
			update: {
				...dto,
				channels: channelIds
					? { set: channelIds.map((id) => ({ id })) }
					: undefined,
			},
			create: {
				...searchData,
				...dto,
				channels: channelIds
					? { connect: channelIds.map((id) => ({ id })) }
					: undefined,
			},
			include: {
				channels: {
					where: {
						isActive: true,
						status: 'VERIFIED',
					},
				},
			},
		});

		return setting;
	}
}
