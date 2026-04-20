import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MessageResponseDto } from '../dto';

export const createCustomMessageDto = (
	dto: MessageResponseDto,
	fieldExample?: string,
) => {
	class CustomMessageResponseDto extends MessageResponseDto {
		@ApiProperty({ example: dto.message })
		declare message: string;

		@ApiProperty({ example: dto.code })
		declare code: string;

		@ApiPropertyOptional({ example: fieldExample ?? dto.field })
		declare field?: string;
	}

	Object.defineProperty(CustomMessageResponseDto, 'name', {
		value: `CustomMessageResponseDto_${dto.code}`,
	});

	return CustomMessageResponseDto;
};
