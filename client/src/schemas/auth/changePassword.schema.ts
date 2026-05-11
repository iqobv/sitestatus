import z from 'zod';
import { passwordSchema } from './password.schema';

export const changePasswordSchema = z
	.object({
		oldPassword: z.string().min(1, { message: 'Old password is required' }),
		newPassword: passwordSchema.shape.password,
		newPasswordConfirm: z
			.string()
			.min(1, { message: 'Password confirmation is required' }),
	})
	.refine((data) => data.newPassword === data.newPasswordConfirm, {
		message: 'Passwords do not match',
	})
	.transform(({ newPasswordConfirm, ...data }) => data);
