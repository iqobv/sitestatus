import { UserWithoutPasswordDto } from '@api/public/user/dto/user.dto';
import { Expose, Type } from 'class-transformer';

export class AccessTokenDto {
	@Expose() accessToken: string;
}

export class AccessTokenWithUserDto extends AccessTokenDto {
	@Expose()
	@Type(() => UserWithoutPasswordDto)
	user: UserWithoutPasswordDto;
}
