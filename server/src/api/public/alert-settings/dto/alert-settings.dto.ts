import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';

export class AlertSettingsDto extends DefaultFieldsDto {
	@ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
	userId: string;

	@ApiProperty({ example: null })
	projectId: string | null;

	@ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
	monitorId: string | null;

	@ApiProperty({ example: true })
	isEnabled: boolean;

	@ApiProperty({ example: true })
	onDown: boolean;

	@ApiProperty({ example: true })
	onUp: boolean;

	@ApiProperty({ example: 0 })
	delay: number;
}
