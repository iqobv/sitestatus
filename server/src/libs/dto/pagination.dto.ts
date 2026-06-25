import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
	@ApiProperty({ required: false, default: 1, minimum: 1, example: 1 })
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	@IsOptional()
	page?: number;

	@ApiProperty({
		required: false,
		default: 10,
		minimum: 1,
		maximum: 100,
		example: 10,
	})
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	@Max(100)
	@IsOptional()
	limit?: number;
}
