import { ChannelStatus, ChannelType } from '@generated/postgres/enums';
import { IsBoolean, IsEnum, IsString } from 'class-validator';

export class InternalCreateNotificationChannelDto {
	@IsEnum(ChannelType)
	type: ChannelType;

	@IsEnum(ChannelStatus)
	status: ChannelStatus;

	@IsString()
	name: string;

	@IsString()
	value: string;

	@IsBoolean()
	isActive: boolean;

	@IsBoolean()
	isPrimary: boolean;
}
