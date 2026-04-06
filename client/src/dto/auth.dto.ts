import { baseAuthSchema, loginSchema, registerSchema } from '@/schemas';
import z from 'zod';

export type AuthDto = z.infer<typeof baseAuthSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type RegisterDto = z.infer<typeof registerSchema>;
export type RegisterFormDto = RegisterDto & {
	passwordConfirm: string;
};
