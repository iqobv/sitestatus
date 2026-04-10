import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class AnalyticsQueryDto {
	@ApiProperty({ example: 1, enum: [1, 7, 30] })
	@Type(() => Number)
	@IsNumber()
	@IsEnum([1, 7, 30])
	daysRange: number;

	@ApiProperty({ example: 'global' })
	@IsString()
	region: string;
}
