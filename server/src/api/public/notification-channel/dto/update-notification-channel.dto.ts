import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateNotificationChannelDto } from './create-notification-channel.dto';

export class UpdateNotificationChannelDto extends PartialType(
	OmitType(CreateNotificationChannelDto, ['type', 'value'] as const),
) {
	@ApiProperty({ example: true })
	@IsBoolean()
	@IsOptional()
	isActive?: boolean;

	@ApiProperty({ example: true })
	@IsBoolean()
	@IsOptional()
	isPrimary?: boolean;
}
