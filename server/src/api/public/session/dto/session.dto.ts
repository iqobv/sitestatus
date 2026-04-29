import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';

export class SessionDto extends DefaultFieldsDto {
	@ApiProperty({ example: 'ab63d552-9e02-4d93-a1b2-8f7e3f931f41' })
	userId: string;

	@ApiProperty({ example: new Date() })
	expiresAt: Date;

	@ApiProperty({ example: '127.0.0.1' })
	ip: string | null;

	@ApiProperty({ example: 'US' })
	countryCode: string | null;

	@ApiProperty({ example: 'New York' })
	city: string | null;

	@ApiProperty({ example: 'Chrome' })
	browser: string | null;

	@ApiProperty({ example: 'Windows' })
	os: string | null;

	@ApiProperty({ example: 'desktop' })
	device: string | null;
}
