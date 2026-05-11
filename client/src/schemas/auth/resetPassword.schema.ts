import z from 'zod';
import { passwordSchema } from './password.schema';

export const resetPasswordSchema = z
	.object({
		newPassword: passwordSchema.shape.password,
		newPasswordConfirm: z
			.string()
			.min(1, { message: 'Password confirmation is required' }),
	})
	.refine((data) => data.newPassword === data.newPasswordConfirm, {
		message: 'Passwords do not match',
		path: ['newPasswordConfirm'],
	})
	.transform(({ newPasswordConfirm, ...data }) => data);
