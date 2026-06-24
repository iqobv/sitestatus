import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { BaseRegionDto } from './base-region.dto';

export class RegionDto extends IntersectionType(
	DefaultFieldsDto,
	BaseRegionDto,
) {
	@ApiProperty({ example: 'North America' })
	continent: string | null;

	@ApiProperty({ example: true })
	isActive: boolean;

	@ApiProperty({ example: -74.006 })
	longitude: number | null;

	@ApiProperty({ example: 40.7128 })
	latitude: number | null;
}
