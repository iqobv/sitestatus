import { PaginatedDataDto } from '@libs/dto/paginated-data.dto';
import { Expose, Type } from 'class-transformer';
import { MonitorDto } from './monitor.dto';

export class PaginatedMonitorsDto extends PaginatedDataDto<MonitorDto> {
	@Expose()
	@Type(() => MonitorDto)
	declare data: MonitorDto[];
}
