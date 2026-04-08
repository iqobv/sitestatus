import { ApiProperty } from '@nestjs/swagger';
import { DefaultFieldsDto } from 'src/libs/dto';

export class RegionDto extends DefaultFieldsDto {
	@ApiProperty({ example: 'us-east' })
	key: string;

	@ApiProperty({ example: 'United States' })
	name: string;

	@ApiProperty({ example: 'North America' })
	continent: string;

	@ApiProperty({ example: true })
	isActive: boolean;

	@ApiProperty({ example: -74.006 })
	longitude: number;

	@ApiProperty({ example: 40.7128 })
	latitude: number;
}
