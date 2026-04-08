import { ApiProperty } from '@nestjs/swagger';
import { DefaultFieldsDto } from 'src/libs/dto';

export class ProjectDto extends DefaultFieldsDto {
	@ApiProperty({ example: 'cd244178-f42d-4e8d-aa1e-8ff164bb8d35' })
	ownerId: string;

	@ApiProperty({ example: 'my-project' })
	slug: string;

	@ApiProperty({ example: 'My Project' })
	name: string;

	@ApiProperty({ example: 'A simple project' })
	description: string;
}
