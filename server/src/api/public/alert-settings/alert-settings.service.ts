import { Prisma } from '@generated/postgres/client';
import { AlertSettingsInclude } from '@generated/postgres/models';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
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

		const filters: Prisma.AlertSettingsWhereInput[] = [
			{
				userId: monitor.userId,
				monitorId: monitor.id,
			},
			{
				userId: monitor.userId,
				projectId: null,
				monitorId: null,
			},
		];

		if (monitor.projectId) {
			filters.push({
				userId: monitor.userId,
				projectId: monitor.projectId,
				monitorId: null,
			});
		}

		const settings = await this.prismaService.alertSettings.findMany({
			where: {
				OR: filters,
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

		if (monitor.projectId) {
			const projectLevel = settings.find(
				(s) => s.projectId === monitor.projectId && s.monitorId === null,
			);
			if (projectLevel) return projectLevel;
		}

		const userLevel = settings.find(
			(s) =>
				s.userId === monitor.userId &&
				s.projectId === null &&
				s.monitorId === null,
		);
		if (userLevel) return userLevel;

		return null;
	}

	async upsertSettings(
		userId: string,
		dto: CreateAlertSettingsDto,
		tx?: Prisma.TransactionClient,
	) {
		const { monitorId, projectId, channelIds, ...rest } = dto;

		const prisma = tx ?? this.prismaService;

		const searchData = {
			userId,
			projectId: projectId ?? null,
			monitorId: monitorId ?? null,
		};

		const existingSetting = await prisma.alertSettings.findFirst({
			where: searchData,
			select: { id: true },
		});

		const include: AlertSettingsInclude = {
			channels: { where: { isActive: true, status: 'VERIFIED' } },
		};

		if (existingSetting) {
			return await prisma.alertSettings.update({
				where: { id: existingSetting.id },
				data: {
					...rest,
					isEnabled:
						!searchData.monitorId && !searchData.projectId
							? true
							: rest.isEnabled,
					channels: channelIds
						? { set: channelIds.map((id) => ({ id })) }
						: undefined,
				},
				include,
			});
		}

		return await prisma.alertSettings.create({
			data: {
				...searchData,
				...rest,
				channels: channelIds
					? { connect: channelIds.map((id) => ({ id })) }
					: undefined,
			},
			include,
		});
	}

	async getSettingsHierarchy(
		userId: string,
		projectId?: string,
		monitorId?: string,
	) {
		let resolvedProjectId = projectId;

		if (monitorId) {
			const monitor = await this.prismaService.monitor.findUnique({
				where: { id: monitorId },
				select: { projectId: true },
			});

			if (monitor?.projectId) {
				resolvedProjectId = monitor.projectId;
			}
		}

		const filters: Prisma.AlertSettingsWhereInput[] = [
			{ userId, projectId: null, monitorId: null },
		];

		if (resolvedProjectId) {
			filters.push({ userId, projectId: resolvedProjectId, monitorId: null });
		}

		if (monitorId) {
			filters.push({ userId, monitorId });
		}

		return await this.prismaService.alertSettings.findMany({
			where: { OR: filters },
			include: { channels: true },
		});
	}

	async deleteAlertSettings(userId: string, id: string) {
		const setting = await this.prismaService.alertSettings.findUnique({
			where: { id, userId },
			select: { id: true, userId: true },
		});

		if (!setting)
			throw new NotFoundException(ERROR_MESSAGES.ALERT.ALERT_NOT_FOUND);

		await this.prismaService.alertSettings.delete({
			where: { id: setting.id, userId: setting.userId },
		});

		return SUCCESS_MESSAGES.ALERT.ALERT_DELETED;
	}
}
