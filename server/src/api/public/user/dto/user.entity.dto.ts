import { UserRole } from '@generated/postgres/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserEntityDto extends DefaultFieldsDto {
	@Expose() email: string;
	@Expose() password: string | null;
	@Expose() emailVerified: boolean;

	@Expose()
	@ApiProperty({ example: UserRole.USER, enum: UserRole, enumName: 'UserRole' })
	role: UserRole;

	@Expose() deletedAt: Date | null;
}
