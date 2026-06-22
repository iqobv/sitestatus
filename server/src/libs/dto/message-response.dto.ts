import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MessageResponseDto {
	@ApiProperty({ example: 'INVALID_INPUT' })
	code: string;

	@ApiProperty({ example: 'The input provided is invalid.' })
	message: string;

	@ApiPropertyOptional({ example: 'email' })
	field?: string;

	@ApiPropertyOptional({ example: { additionalInfo: 'Some extra details' } })
	meta?: Record<string, unknown>;

	constructor(partial: Partial<MessageResponseDto>) {
		Object.assign(this, partial);
	}
}
