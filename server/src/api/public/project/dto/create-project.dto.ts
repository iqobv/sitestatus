import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
	@ApiProperty({ example: 'My Project' })
	@MinLength(4)
	@MaxLength(100)
	@IsString()
	name: string;

	@ApiProperty({ example: 'my-project' })
	@IsString()
	@MinLength(4)
	@MaxLength(100)
	slug: string;

	@ApiProperty({ example: 'A brief description of the project.' })
	@IsOptional()
	@IsString()
	description?: string;
}
