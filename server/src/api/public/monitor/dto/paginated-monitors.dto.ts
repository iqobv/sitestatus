import { PaginatedDataDto } from '@libs/dto/paginated-data.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MonitorDto } from './monitor.dto';

export class PaginatedMonitorsDto extends PaginatedDataDto<MonitorDto> {
	@ApiProperty({ type: [MonitorDto] })
	@Type(() => MonitorDto)
	declare data: MonitorDto[];
}
