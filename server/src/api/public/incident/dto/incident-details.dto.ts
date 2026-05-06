import { ApiProperty } from '@nestjs/swagger';
import { IncidentTimelineDto } from './incident-timeline.dto';
import { IncidentDto } from './incident.dto';

export class IncidentDetailsDto extends IncidentDto {
	@ApiProperty({ type: [IncidentTimelineDto] })
	timeline: IncidentTimelineDto[];
}
