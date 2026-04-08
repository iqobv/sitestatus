import { ApiProperty } from '@nestjs/swagger';
import { UserWithoutPasswordDto } from '../../user/dto';

export class AccessTokenDto {
	@ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
	accessToken: string;
}

export class AccessTokenWithUserDto extends AccessTokenDto {
	@ApiProperty({ type: UserWithoutPasswordDto })
	user: UserWithoutPasswordDto;
}
