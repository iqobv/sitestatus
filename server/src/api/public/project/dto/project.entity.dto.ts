import { BaseMonitorDto } from '@api/public/monitor/dto/monitor.dto';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose, Type } from 'class-transformer';

export class ProjectEntityDto extends DefaultFieldsDto {
	@Expose() name: string;
	@Expose() description: string | null;

	@Type(() => BaseMonitorDto)
	@Expose()
	monitors: BaseMonitorDto[];
}
