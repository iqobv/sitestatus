import { PaginatedDataDto } from '@libs/dto/paginated-data.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { StatusPageDto } from './status-page.dto';

export class PaginatedStatusPagesDto extends PaginatedDataDto<StatusPageDto> {
	@ApiProperty({ type: [StatusPageDto] })
	@Type(() => StatusPageDto)
	declare data: StatusPageDto[];
}
