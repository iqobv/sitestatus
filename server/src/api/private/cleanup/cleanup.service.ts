import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CleanupService {
	constructor(
		private readonly pgPrismaService: PgPrismaService,
		private readonly tursoPrismaService: TursoPrismaService,
	) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	private async cleanupDeletedMonitors() {
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
			console.log(error);
		}
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	private async cleanupDeletedProjects() {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		await this.pgPrismaService.project.deleteMany({
			where: {
				deletedAt: {
					lt: thirtyDaysAgo,
				},
			},
		});
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	private async cleanUpDeletedUsers() {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		await this.pgPrismaService.user.deleteMany({
			where: {
				deletedAt: {
					lt: thirtyDaysAgo,
				},
			},
		});
	}
}
