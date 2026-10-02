import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose, Type } from 'class-transformer';
import { FullStatusPageMonitorDto } from './status-page-monitor.dto';

export class StatusPageEntityDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() slug: string;
	@Expose() title: string;
	@Expose() description: string | null;
	@Expose() isPublished: boolean;
	@Expose() customDomain: string | null;
	@Expose() iconUrl: string | null;

	@Expose()
	@Type(() => FullStatusPageMonitorDto)
	monitors: FullStatusPageMonitorDto[];
}
