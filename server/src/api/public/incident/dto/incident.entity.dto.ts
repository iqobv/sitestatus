import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose, Type } from 'class-transformer';
import { IncidentTimelineDto } from './incident-timeline.dto';

export class IncidentEntityDto extends DefaultFieldsDto {
	@Expose() monitorId: string;
	@Expose() regionId: string;
	@Expose() triggerLogId: string | null;
	@Expose() errorMessage: string | null;
	@Expose() statusCode: number | null;
	@Expose() resolved: boolean;
	@Expose() resolvedAt: Date | null;
	@Expose() alertTriggered: boolean;
	@Expose() alertSentAt: Date | null;

	@Type(() => IncidentTimelineDto)
	@Expose()
	timeline: IncidentTimelineDto[];
}
