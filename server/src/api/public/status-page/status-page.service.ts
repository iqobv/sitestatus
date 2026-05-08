import { Prisma } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { publicStatusPageSelect } from '@libs/prisma';
import { withField } from '@libs/utils';
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { MonitorService } from '../monitor/services/monitor.service';
import {
	CreateStatusPageDto,
	PublicStatusPageMonitorsDto,
	StatusPageMonitorDto,
	UpdateStatusPageDto,
} from './dto';
import { ExistingMonitorRecord, MonitorUpdatePayload } from './interfaces';

@Injectable()
export class StatusPageService {
	constructor(
		private readonly pgPrismaService: PgPrismaService,
		private readonly monitorService: MonitorService,
	) {}

	async createStatusPage(userId: string, dto: CreateStatusPageDto) {
		const { monitors, ...rest } = dto;

		const monitorIds = monitors.map((m) => m.id);

		const existingMonitors = await this.pgPrismaService.monitor.findMany({
			where: { id: { in: monitorIds }, userId },
			select: { id: true },
		});

		if (existingMonitors.length !== monitorIds.length) {
			throw new NotFoundException(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND);
		}

		return await this.catchUniqueConstraintError(async () => {
			await this.pgPrismaService.statusPage.create({
				data: {
					...rest,
					monitors: {
						createMany: {
							data: monitors.map(({ id, ...rest }) => ({
								displayName: rest.displayName,
								monitorId: id,
								sortOrder: rest.sortOrder,
							})),
						},
					},
					user: { connect: { id: userId } },
				},
				include: {
					monitors: true,
				},
			});
		});
	}

	async getStatusPageBySlug(slug: string, userId: string | null) {
		const statusPage = await this.pgPrismaService.statusPage.findFirst({
			where: {
				slug,
				OR: [{ isPublished: true }, ...(userId ? [{ userId }] : [])],
			},
			select: publicStatusPageSelect,
		});

		if (!statusPage)
			throw new NotFoundException(
				ERROR_MESSAGES.STATUS_PAGE.STATUS_PAGE_NOT_FOUND,
			);

		return statusPage;
	}

	async getMonitorsBySlug(slug: string, userId: string | null) {
		const statusPage = await this.getStatusPageBySlug(slug, userId);

		const statusPageMonitors =
			await this.pgPrismaService.statusPageMonitor.findMany({
				where: { statusPageId: statusPage.id },
				select: {
					id: true,
					displayName: true,
					sortOrder: true,
					monitorId: true,
					monitor: {
						select: {
							name: true,
						},
					},
				},
				orderBy: { sortOrder: 'asc' },
			});

		const monitorTimelines = await this.monitorService.findAllPublicMonitors(
			statusPageMonitors.map((m) => m.monitorId),
		);

		const mappedMonitors = statusPageMonitors.reduce<
			PublicStatusPageMonitorsDto[]
		>((acc, monitor) => {
			const {
				displayName,
				monitorId,
				monitor: { name },
				id,
				...rest
			} = monitor;

			const publicMonitor = monitorTimelines.find((t) => t.id === monitorId);

			if (publicMonitor) {
				acc.push({
					id: id,
					displayName: displayName || name,
					monitorId,
					lastStatus: publicMonitor.lastStatus!,
					uptime: publicMonitor.uptime!,
					timeline: publicMonitor.timeline!,
					...rest,
				});
			}
			return acc;
		}, []);

		return mappedMonitors;
	}

	async getStatusPagesByUserId(userId: string) {
		return await this.pgPrismaService.statusPage.findMany({
			where: { userId },
		});
	}

	async getStatusPageById(id: string, userId: string) {
		const statusPage = await this.pgPrismaService.statusPage.findUnique({
			where: { id, userId },
			include: {
				monitors: {
					include: {
						monitor: true,
					},
					orderBy: { sortOrder: 'asc' },
				},
			},
		});

		if (!statusPage)
			throw new NotFoundException(
				ERROR_MESSAGES.STATUS_PAGE.STATUS_PAGE_NOT_FOUND,
			);

		return statusPage;
	}

	async updateStatusPage(id: string, userId: string, dto: UpdateStatusPageDto) {
		const { monitors, ...rest } = dto;

		const statusPage = await this.getStatusPageById(id, userId);

		if (!monitors || monitors?.length === 0) {
			return await this.saveUpdateStatusPage(id, userId, dto);
		}

		const monitorIds = monitors.map((m) => m.id);

		const existingMonitors = await this.pgPrismaService.monitor.findMany({
			where: { id: { in: monitorIds }, userId },
			select: { id: true },
		});

		if (existingMonitors.length !== monitorIds.length) {
			throw new NotFoundException(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND);
		}

		const { toCreate, toDeleteIds, toUpdate } = this.calculateDiff(
			statusPage.monitors,
			monitors,
		);

		return await this.pgPrismaService.$transaction(async (tx) => {
			if (toDeleteIds.length > 0) {
				await tx.statusPageMonitor.deleteMany({
					where: { id: { in: toDeleteIds } },
				});
			}

			for (const updatePayload of toUpdate) {
				await tx.statusPageMonitor.update({
					where: { id: updatePayload.id },
					data: updatePayload.data,
				});
			}

			if (toCreate.length > 0) {
				await tx.statusPageMonitor.createMany({
					data: toCreate.map(({ id, ...rest }) => ({
						monitorId: id,
						...rest,
						statusPageId: statusPage.id,
					})),
					skipDuplicates: true,
				});
			}

			return await this.saveUpdateStatusPage(id, userId, rest, tx);
		});
	}

	private async saveUpdateStatusPage(
		id: string,
		userId: string,
		dto: Omit<UpdateStatusPageDto, 'monitors'>,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.pgPrismaService;

		return await this.catchUniqueConstraintError(async () => {
			return await prisma.statusPage.update({
				where: { id, userId },
				data: dto,
				include: {
					monitors: {
						include: {
							monitor: true,
						},
						orderBy: { sortOrder: 'asc' },
					},
				},
			});
		});
	}

	async deleteStatusPage(id: string, userId: string) {
		await this.getStatusPageById(id, userId);

		await this.pgPrismaService.statusPage.delete({
			where: { id, userId },
		});

		return SUCCESS_MESSAGES.STATUS_PAGE.STATUS_PAGE_DELETED;
	}

	private async catchUniqueConstraintError(callback: () => Promise<unknown>) {
		try {
			return await callback();
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ConflictException(
						withField(
							ERROR_MESSAGES.STATUS_PAGE.STATUS_PAGE_SLUG_EXISTS,
							'slug',
						),
					);
				}
			}
			throw error;
		}
	}

	private calculateDiff(
		existingMonitors: ExistingMonitorRecord[],
		incomingMonitors: StatusPageMonitorDto[],
	) {
		const incomingIds = new Set(incomingMonitors.map((m) => m.id));
		const existingIds = new Set(existingMonitors.map((m) => m.monitorId));

		const toDeleteIds = existingMonitors
			.filter((m) => !incomingIds.has(m.monitorId))
			.map((m) => m.id);

		const toCreate =
			incomingMonitors.filter((m) => !existingIds.has(m.id)) || [];

		const toUpdate =
			incomingMonitors?.reduce<MonitorUpdatePayload[]>((acc, curr) => {
				const { id, ...rest } = curr;

				const existingMonitor = existingMonitors.find(
					(m) => m.monitorId === id,
				);

				if (existingMonitor) {
					acc.push({
						id: existingMonitor.id,
						data: rest,
					});
				}
				return acc;
			}, []) || [];

		return { toDeleteIds, toCreate, toUpdate };
	}
}
