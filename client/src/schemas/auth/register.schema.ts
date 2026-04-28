import { z } from 'zod';
import { baseAuthSchema } from './baseAuth.schema';

export const registerSchema = baseAuthSchema
	.extend({
		passwordConfirm: z
			.string()
			.min(1, { message: 'Password confirmation is required' }),
		acceptTerms: z.literal(true, {
			message: 'You must accept the terms and conditions',
		}),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords do not match',
		path: ['passwordConfirm'],
	})
	.transform(({ passwordConfirm, acceptTerms, ...data }) => data);
