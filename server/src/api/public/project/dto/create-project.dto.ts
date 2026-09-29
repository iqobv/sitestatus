import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
	@MinLength(4)
	@MaxLength(100)
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description?: string;
}
