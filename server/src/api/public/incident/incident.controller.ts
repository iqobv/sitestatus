import { ERROR_MESSAGES } from '@libs/constants';
import { Auth, Authorized } from '@libs/decorators';
import { createCustomMessageDto } from '@libs/utils';
import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { IncidentDetailsDto } from './dto';
import { IncidentService } from './incident.service';

@Controller('incidents')
export class IncidentController {
	constructor(private readonly incidentService: IncidentService) {}

	@Auth()
	@ApiOperation({ summary: 'Get details of a specific incident' })
	@ApiOkResponse({ type: IncidentDetailsDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.INCIDENT.INCIDENT_NOT_FOUND),
	})
	@Get('monitor/:monitorId/incident/:incidentId')
	async getIncidentDetails(
		@Param('monitorId') monitorId: string,
		@Param('incidentId') incidentId: string,
		@Authorized('id') userId: string,
	) {
		return await this.incidentService.getIncidentDetails(
			monitorId,
			incidentId,
			userId,
		);
	}
}
