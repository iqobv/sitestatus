import { PaginatedDataDto } from '@libs/dto/paginated-data.dto';
import { Expose, Type } from 'class-transformer';
import { StatusPageDto } from './status-page.dto';

export class PaginatedStatusPagesDto extends PaginatedDataDto<StatusPageDto> {
	@Expose()
	@Type(() => StatusPageDto)
	declare data: StatusPageDto[];
}
