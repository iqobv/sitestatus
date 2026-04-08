import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRegionDto {
	@ApiProperty({ example: 'us-east' })
	@IsString()
	key: string;

	@ApiProperty({ example: 'US East' })
	@IsString()
	name: string;

	@ApiProperty({ example: 'North America' })
	@IsOptional()
	@IsString()
	continent?: string;

	@ApiProperty({ example: true })
	@IsOptional()
	@IsBoolean()
	isActive?: boolean;

	@ApiProperty({ example: -74.006 })
	@IsOptional()
	@IsNumber()
	longitude?: number;

	@ApiProperty({ example: 40.7128 })
	@IsOptional()
	@IsNumber()
	latitude?: number;
}
