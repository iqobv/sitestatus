import { ChannelStatus, ChannelType } from '@generated/postgres/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NotificationChannelEntityDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() name: string;

	@Expose()
	@ApiProperty({
		example: ChannelType.EMAIL,
		enum: ChannelType,
		enumName: 'ChannelType',
	})
	type: ChannelType;

	@Expose()
	@ApiProperty({
		example: ChannelStatus.VERIFIED,
		enum: ChannelStatus,
		enumName: 'ChannelStatus',
	})
	status: ChannelStatus;

	@Expose() value: string;
	@Expose() isActive: boolean;
	@Expose() isPrimary: boolean;
}
