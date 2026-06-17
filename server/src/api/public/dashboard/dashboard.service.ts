import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { Injectable } from '@nestjs/common';
import { DashboardDto, DashboardIncidentDto } from './dto/dashboard.dto';

@Injectable()
export class DashboardService {
	constructor(
		private readonly pgPrismaService: PgPrismaService,
		private readonly tursoPrismaService: TursoPrismaService,
	) {}

	public async getDashboard(userId: string): Promise<DashboardDto> {
		const monitors = await this.pgPrismaService.monitor.findMany({
			where: { userId },
			take: 5,
			orderBy: { createdAt: 'desc' },
		});

		const monitorIds = monitors.map((monitor) => monitor.id);

		const incidents = await this.tursoPrismaService.monitorIncident.findMany({
			where: { monitorId: { in: monitorIds } },
			orderBy: { createdAt: 'desc' },
			take: 5,
		});

		const mappedIncidents: DashboardIncidentDto[] = incidents.map(
			(incident) => ({
				...incident,
				monitor:
					monitors.find((monitor) => monitor.id === incident.monitorId) || null,
			}),
		);

		const statusPages = await this.pgPrismaService.statusPage.findMany({
			where: { userId },
			take: 5,
			orderBy: { createdAt: 'desc' },
		});

		const projects = await this.pgPrismaService.project.findMany({
			where: { ownerId: userId },
			take: 5,
			orderBy: { createdAt: 'desc' },
		});

		return {
			monitors,
			incidents: mappedIncidents,
			statusPages,
			projects,
		};
	}
}
