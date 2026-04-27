import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { MessageResponseDto } from '../dto/message-response.dto';

export const createCustomMessageDto = (
	dto: MessageResponseDto,
	fieldExample?: string,
) => {
	const exampleValue = fieldExample ?? dto.field;

	if (exampleValue !== undefined && exampleValue !== null) {
		class CustomMessageResponseDto extends MessageResponseDto {
			@ApiProperty({ example: dto.message })
			declare message: string;

			@ApiProperty({ example: dto.code })
			declare code: string;

			@ApiPropertyOptional({ example: exampleValue })
			declare field?: string;
		}

		Object.defineProperty(CustomMessageResponseDto, 'name', {
			value: `CustomMessageResponseDto_${dto.code}`,
		});

		return CustomMessageResponseDto;
	}

	class CustomMessageResponseDto extends OmitType(MessageResponseDto, [
		'field',
	] as const) {
		@ApiProperty({ example: dto.message })
		declare message: string;

		@ApiProperty({ example: dto.code })
		declare code: string;
	}

	Object.defineProperty(CustomMessageResponseDto, 'name', {
		value: `CustomMessageResponseDto_${dto.code}`,
	});

	return CustomMessageResponseDto;
};
