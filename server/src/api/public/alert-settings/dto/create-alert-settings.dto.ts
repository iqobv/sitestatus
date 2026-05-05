import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
	Min,
} from 'class-validator';

export class CreateAlertSettingsDto {
	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000',
		required: false,
	})
	@IsUUID('4')
	@IsOptional()
	projectId?: string;

	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000',
		required: false,
	})
	@IsUUID('4')
	@IsOptional()
	monitorId?: string;

	@ApiProperty({
		example: true,
		required: false,
	})
	@IsBoolean()
	@IsOptional()
	isEnabled?: boolean;

	@ApiProperty({
		example: true,
		required: false,
	})
	@IsBoolean()
	@IsOptional()
	onDown?: boolean;

	@ApiProperty({
		example: true,
		required: false,
	})
	@IsBoolean()
	@IsOptional()
	onUp?: boolean;

	@ApiProperty({
		example: 5,
		required: false,
		description: 'Delay in minutes before sending a notification',
	})
	@IsNumber()
	@IsOptional()
	@Min(0)
	delay?: number;

	@ApiProperty({
		example: ['550e8400-e29b-41d4-a716-446655440000'],
		required: false,
	})
	@IsString({ each: true })
	@IsOptional()
	channelIds?: string[];
}
