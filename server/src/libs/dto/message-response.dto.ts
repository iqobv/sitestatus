import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
	@ApiProperty({ example: 'Operation message' })
	message: string;

	@ApiProperty({ example: 'CODE' })
	code: string;
}
