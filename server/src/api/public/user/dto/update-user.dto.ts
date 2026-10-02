import { UserRole } from '@generated/postgres/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
	@IsEmail()
	@IsOptional()
	email?: string;
}

export class InternalUpdateUserDto extends UpdateUserDto {
	@IsBoolean()
	@IsOptional()
	emailVerified?: boolean;

	@ApiProperty({ example: UserRole.USER, enum: UserRole, enumName: 'UserRole' })
	@IsEnum(UserRole)
	@IsOptional()
	role?: UserRole;
}
