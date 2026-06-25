import { baseAuthSchema } from '@/schemas/auth/baseAuth.schema';
import { changePasswordSchema } from '@/schemas/auth/changePassword.schema';
import { emailSchema } from '@/schemas/auth/email.schema';
import { loginSchema } from '@/schemas/auth/login.schema';
import { registerSchema } from '@/schemas/auth/register.schema';
import { resetPasswordSchema } from '@/schemas/auth/resetPassword.schema';
import z from 'zod';

export type AuthDto = z.infer<typeof baseAuthSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type RegisterDto = z.infer<typeof registerSchema>;
export type RegisterFormDto = RegisterDto & {
	passwordConfirm: string;
	acceptTerms: boolean;
};
export type EmailDto = z.infer<typeof emailSchema>;
export type ChangePasswordDto = z.infer<typeof changePasswordSchema> & {
	newPasswordConfirm: string;
};
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema> & {
	newPasswordConfirm: string;
};
