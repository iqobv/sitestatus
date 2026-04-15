import {
	LOWERCASE_ERROR_MESSAGE,
	MIN_LENGTH_ERROR_MESSAGE,
	NUMBER_ERROR_MESSAGE,
	UPPERCASE_ERROR_MESSAGE,
} from '@/constants';
import { z } from 'zod';

export const passwordSchema = z.object({
	password: z
		.string()
		.min(1, { message: 'Password is required' })
		.min(8, { message: MIN_LENGTH_ERROR_MESSAGE })
		.refine((password) => /[A-Z]/.test(password), {
			message: UPPERCASE_ERROR_MESSAGE,
		})
		.refine((password) => /[a-z]/.test(password), {
			message: LOWERCASE_ERROR_MESSAGE,
		})
		.refine((password) => /[0-9]/.test(password), {
			message: NUMBER_ERROR_MESSAGE,
		}),
});
