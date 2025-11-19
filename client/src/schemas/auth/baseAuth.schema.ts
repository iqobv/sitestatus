import {
	EMAIL_ERROR_MESSAGE,
	LOWERCASE_ERROR_MESSAGE,
	MIN_LENGTH_ERROR_MESSAGE,
	NUMBER_ERROR_MESSAGE,
	UPPERCASE_ERROR_MESSAGE,
} from '@/constants';
import { z } from 'zod';

export const EmailSchema = z.object({
	email: z
		.email()
		.refine(
			(email) => {
				const domain = email.split('@')[1];
				return domain === 'gmail.com';
			},
			{ message: EMAIL_ERROR_MESSAGE }
		)

		.nonempty({ error: 'Email is required' }),
});

export const PasswordSchema = z.object({
	password: z
		.string()
		.nonempty({ error: 'Password is required' })
		.min(8, { error: MIN_LENGTH_ERROR_MESSAGE })
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

export const BaseAuthSchema = EmailSchema.extend(PasswordSchema.shape);
