import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse } from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IncidentDetailsDto } from './dto/incident-details.dto';
import { IncidentService } from './incident.service';

@Auth()
@ApiTags('Incidents')
@Controller('incidents')
export class IncidentController {
	constructor(private readonly incidentService: IncidentService) {}

	@ApiOperation({ summary: 'Get details of a specific incident' })
	@ApiOkResponse({ type: IncidentDetailsDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.MONITOR.NOT_FOUND,
		ERROR_MESSAGES.INCIDENT.NOT_FOUND,
	])
	@Get('monitor/:monitorId/incident/:incidentId')
	public async getIncidentDetails(
		@Param('monitorId') monitorId: string,
		@Param('incidentId') incidentId: string,
		@Authorized('id') userId: string,
	): Promise<IncidentDetailsDto> {
		return await this.incidentService.getIncidentDetails(
			monitorId,
			incidentId,
			userId,
		);
	}
}
