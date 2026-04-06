import { ApiProperty } from '@nestjs/swagger';
import { MessageResponseDto } from '../dto';

export const createCustomMessageDto = (dto: MessageResponseDto) => {
	class CustomMessageResponseDto extends MessageResponseDto {
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
