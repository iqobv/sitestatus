import { ApiProperty } from '@nestjs/swagger';

export class DefaultFieldsDto {
	@ApiProperty({ example: 'cd244178-f42d-4e8d-aa1e-8ff164bb8d35' })
	id: string;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: new Date() })
	updatedAt: Date;
}
