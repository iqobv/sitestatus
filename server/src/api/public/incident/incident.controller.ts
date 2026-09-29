import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse } from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IncidentDetailsDto } from './dto/incident.dto';
import { IncidentService } from './incident.service';

@Auth()
@ApiTags('Incidents')
@Controller('incidents')
export class IncidentController {
	constructor(private readonly incidentService: IncidentService) {}

	/** Get incident details by monitorId and incidentId */
	@Get('monitor/:monitorId/incident/:incidentId')
	@ApiOkResponse({ type: IncidentDetailsDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.MONITOR.NOT_FOUND,
		ERROR_MESSAGES.INCIDENT.NOT_FOUND,
	])
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
