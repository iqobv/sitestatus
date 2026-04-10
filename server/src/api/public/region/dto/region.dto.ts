import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { DefaultFieldsDto } from 'src/libs/dto';
import { BaseRegionDto } from './base-region.dto';

export class RegionDto extends IntersectionType(
	DefaultFieldsDto,
	BaseRegionDto,
) {
	@ApiProperty({ example: 'North America' })
	continent: string;

	@ApiProperty({ example: true })
	isActive: boolean;

	@ApiProperty({ example: -74.006 })
	longitude: number;

	@ApiProperty({ example: 40.7128 })
	latitude: number;
}
