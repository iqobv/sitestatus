import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDataMetaDto {
	@ApiProperty({ example: 100 })
	total: number;

	@ApiProperty({ example: 1 })
	page: number;

	@ApiProperty({ example: 10 })
	pageSize: number;

	@ApiProperty({ example: 10 })
	totalPages: number;
}

export class PaginatedDataDto<T> {
	@ApiProperty({ type: [Object] })
	data: T[];

	@ApiProperty({ type: () => PaginatedDataMetaDto })
	meta: PaginatedDataMetaDto;
}
