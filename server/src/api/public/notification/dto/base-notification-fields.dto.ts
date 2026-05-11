import { NotificationType } from '@generated/postgres/enums';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength,
} from 'class-validator';

export class BaseNotificationFieldsDto {
	@ApiProperty({
		example: NotificationType.INCIDENT,
		enum: NotificationType,
	})
	@IsEnum(NotificationType)
	@IsNotEmpty()
	type: NotificationType;

	@ApiProperty({ example: true })
	@IsBoolean()
	isAppNotification: boolean;

	@ApiProperty({ example: false })
	@IsBoolean()
	@IsOptional()
	isEmailNotification?: boolean;

	@ApiProperty({ example: 'Notification Title' })
	@IsString()
	@MinLength(3)
	@IsNotEmpty()
	title: string;

	@ApiProperty({ example: 'This is the notification message.' })
	@IsString()
	@MinLength(5)
	@IsNotEmpty()
	message: string;

	@ApiProperty({ example: 'https://example.com/action' })
	@IsString()
	@MinLength(5)
	@IsOptional()
	actionUrl?: string;
}
