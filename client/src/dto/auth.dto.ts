import {
	baseAuthSchema,
	changePasswordSchema,
	emailSchema,
	loginSchema,
	registerSchema,
	resetPasswordSchema,
} from '@/schemas';
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
