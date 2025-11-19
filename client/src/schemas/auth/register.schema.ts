import z from 'zod';
import { BaseAuthSchema } from './baseAuth.schema';

export const RegisterSchema = BaseAuthSchema.extend({
	passwordConfirm: z
		.string()
		.nonempty({ error: 'Password confirmation is required' }),
})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords do not match',
	})
	.omit({
		passwordConfirm: true,
	});
