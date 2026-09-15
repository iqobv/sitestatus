import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CleanupService {
	private readonly logger = new Logger(CleanupService.name);

	constructor(
		private readonly pgPrismaService: PgPrismaService,
		private readonly tursoPrismaService: TursoPrismaService,
	) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	private async cleanupDeletedMonitors(): Promise<void> {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		try {
			const deletedMonitors = await this.pgPrismaService.monitor.findMany({
				where: {
					deletedAt: {
						lt: thirtyDaysAgo,
					},
				},
				select: { id: true },
			});

			if (deletedMonitors.length === 0) return;

			const monitorIds = deletedMonitors.map((m) => m.id);

			await this.pgPrismaService.monitor.deleteMany({
				where: { id: { in: monitorIds } },
			});

			await this.tursoPrismaService.$transaction(async (tx) => {
				await tx.monitorState.deleteMany({
					where: { monitorId: { in: monitorIds } },
				});

				await tx.monitorLog.deleteMany({
					where: { monitorId: { in: monitorIds } },
				});

				await tx.monitorRegion.deleteMany({
					where: { monitorId: { in: monitorIds } },
				});

				await tx.monitorStats.deleteMany({
					where: { monitorId: { in: monitorIds } },
				});

				await tx.monitorIncident.deleteMany({
					where: { monitorId: { in: monitorIds } },
				});
			});
		} catch (error) {
			this.logger.error('Failed to cleanup deleted monitors', error);
		}
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	private async cleanupDeletedProjects(): Promise<void> {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		try {
			await this.pgPrismaService.project.deleteMany({
				where: {
					deletedAt: {
						lt: thirtyDaysAgo,
					},
				},
			});
		} catch (error) {
			this.logger.error('Failed to cleanup deleted projects', error);
		}
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	private async cleanUpDeletedUsers(): Promise<void> {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		try {
			await this.pgPrismaService.user.deleteMany({
				where: {
					deletedAt: {
						lt: thirtyDaysAgo,
					},
				},
			});
		} catch (error) {
			this.logger.error('Failed to cleanup deleted users', error);
		}
	}
}
