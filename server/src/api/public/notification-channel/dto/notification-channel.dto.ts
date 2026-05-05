import { ChannelStatus, ChannelType } from '@generated/postgres/enums';
import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationChannelDto extends DefaultFieldsDto {
	@ApiProperty({ example: 'cd244178-f42d-4e8d-aa1e-8ff164bb8d35' })
	userId: string;

	@ApiProperty({ example: 'Primary Email' })
	name: string;

	@ApiProperty({ example: ChannelType.EMAIL, enum: ChannelType })
	type: ChannelType;

	@ApiProperty({ example: ChannelStatus.VERIFIED, enum: ChannelStatus })
	status: ChannelStatus;

	@ApiProperty({ example: 'user@example.com' })
	value: string;

	@ApiProperty({ example: true })
	isActive: boolean;

	@ApiProperty({ example: true })
	isPrimary: boolean;
}
