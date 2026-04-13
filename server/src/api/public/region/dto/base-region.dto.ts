import { ApiProperty } from '@nestjs/swagger';

export class BaseRegionDto {
	@ApiProperty({ example: 'us-east' })
	key: string;

	@ApiProperty({ example: 'United States' })
	name: string;
}
