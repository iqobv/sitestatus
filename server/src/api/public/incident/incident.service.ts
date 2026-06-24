import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IncidentDetailsDto } from './dto/incident-details.dto';
import {
	IncidentTimelineDto,
	IncidentTimelineType,
} from './dto/incident-timeline.dto';

@Injectable()
export class IncidentService {
	constructor(
		private readonly pgPrismaService: PgPrismaService,
		private readonly tursoPrismaService: TursoPrismaService,
	) {}

	public async getIncidentDetails(
		monitorId: string,
		incidentId: string,
		userId: string,
	): Promise<IncidentDetailsDto> {
		const monitor = await this.pgPrismaService.monitor.findUnique({
			where: { id: monitorId, userId },
		});

		if (!monitor) throw new NotFoundException(ERROR_MESSAGES.MONITOR.NOT_FOUND);

		const incident = await this.tursoPrismaService.monitorIncident.findUnique({
			where: { id: incidentId, monitorId },
		});

		if (!incident)
			throw new NotFoundException(ERROR_MESSAGES.INCIDENT.NOT_FOUND);

		const incidentTimeline: IncidentTimelineDto[] = [
			{
				type: IncidentTimelineType.CREATED,
				timestamp: incident.createdAt,
				metadata: incident.regionId,
			},
		];

		if (incident.alertTriggered && incident.alertSentAt) {
			incidentTimeline.push({
				type: IncidentTimelineType.ALERTED,
				timestamp: incident.alertSentAt,
				metadata: '',
			});
		}

		if (incident.resolvedAt) {
			incidentTimeline.push({
				type: IncidentTimelineType.RESOLVED,
				timestamp: incident.resolvedAt,
				metadata: '',
			});
		}

		const sortedTimeline = incidentTimeline.sort(
			(a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
		);

		return {
			...incident,
			timeline: sortedTimeline,
		};
	}
}
