import { MessageResponseDto } from '@libs/dto/message-response.dto';
import { MessageDomain } from '@libs/types/messages/message-domain.types';

export const createMessageDomain = <
	T extends Record<string, string>,
	P extends string = '',
>(
	messages: T,
	prefix?: P,
): MessageDomain<T, P> => {
	const hasPrefix = prefix && prefix !== '';

	return Object.fromEntries(
		Object.entries(messages).map(([key, value]) => {
			const generatedCode = hasPrefix ? `${prefix}_${key}` : key;

			return [
				key,
				new MessageResponseDto({
					code: generatedCode,
					message: value,
				}),
			];
		}),
	) as MessageDomain<T, P>;
};
