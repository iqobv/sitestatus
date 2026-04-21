import { ApiProperty } from '@nestjs/swagger';
import { DefaultFieldsDto } from 'src/libs/dto';

export class ProjectDto extends DefaultFieldsDto {
	@ApiProperty({ example: 'my-project' })
	slug: string;

	@ApiProperty({ example: 'My Project' })
	name: string;

	@ApiProperty({ example: 'A simple project' })
	description: string;
}
