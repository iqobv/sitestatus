import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ERROR_MESSAGES } from 'src/libs/constants';
import { CreateMonitorDto, UpdateMonitorDto } from './dto';

@Injectable()
export class MonitorService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(userId: string, dto: CreateMonitorDto) {
		const {
			name,
			url,
			checkIntervalSeconds,
			lastCheckedAt,
			lastStatus,
			isActive,
			projectId,
		} = dto;

		const monitor = await this.prismaService.monitor.create({
			data: {
				name,
				url,
				checkIntervalSeconds,
				lastCheckedAt,
				lastStatus,
				isActive,
				projectId: projectId || null,
				userId,
			},
		});

		return monitor;
	}

	async findAll(userId: string) {
		const monitors = await this.prismaService.monitor.findMany({
			where: { userId },
			include: {
				pingResults: {
					where: {
						checkedAt: { gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
					},
					orderBy: { checkedAt: 'desc' },
				},
			},
		});

		return monitors;
	}

	async findById(userId: string, id: string) {
		const monitor = await this.prismaService.monitor.findUnique({
			where: { id, userId },
			include: {
				pingResults: {
					where: {
						checkedAt: { gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
					},
					orderBy: { checkedAt: 'desc' },
				},
			},
		});

		if (!monitor)
			throw new NotFoundException(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND);

		return monitor;
	}

	async update(id: string, userId: string, dto: UpdateMonitorDto) {
		const {
			name,
			url,
			checkIntervalSeconds,
			isActive,
			nextCheckAt,
			lastCheckedAt,
			lastStatus,
			projectId,
		} = dto;

		const monitor = await this.ownerCheck(id, userId);

		const updatedMonitor = await this.prismaService.monitor.update({
			where: { id: monitor.id, userId },
			data: {
				name,
				url,
				checkIntervalSeconds,
				isActive,
				nextCheckAt,
				lastCheckedAt,
				lastStatus,
				projectId,
			},
		});

		return updatedMonitor;
	}

	async remove(id: string, userId: string) {
		const monitor = await this.ownerCheck(id, userId);

		await this.prismaService.monitor.delete({
			where: { id: monitor.id, userId },
		});

		return true;
	}

	private async ownerCheck(id: string, userId: string) {
		const monitor = await this.prismaService.monitor.findUnique({
			where: { id, userId },
		});

		if (!monitor)
			throw new NotFoundException(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND);

		return monitor;
	}
}
