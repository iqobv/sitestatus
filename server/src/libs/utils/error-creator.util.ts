import { ErrorDomain } from '../types';

export const createErrorDomain = <T extends Record<string, string>>(
	messages: T,
): ErrorDomain<T> => {
	return Object.entries(messages).reduce((acc, [key, value]) => {
		return {
			...acc,
			[key]: {
				code: key,
				message: value,
			},
		};
	}, {} as ErrorDomain<T>);
};
