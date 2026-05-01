import { ChannelType } from '@generated/postgres/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class CreateNotificationChannelDto {
	@ApiProperty({ example: ChannelType.EMAIL, enum: ChannelType })
	@IsEnum(ChannelType)
	type: ChannelType;

	@ApiProperty({ example: 'Work Email' })
	@IsString()
	name: string;

	@ApiProperty({ example: 'work@email.com' })
	@IsString()
	value: string;
}
