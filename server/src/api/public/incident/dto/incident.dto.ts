import { OmitType } from '@nestjs/swagger';
import { IncidentEntityDto } from './incident.entity.dto';

export class IncidentDto extends OmitType(IncidentEntityDto, [
	'timeline',
] as const) {}

export class IncidentDetailsDto extends IncidentEntityDto {}
