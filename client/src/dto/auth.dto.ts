import { BaseAuthSchema, LoginSchema, RegisterSchema } from '@/schemas';
import z from 'zod';

export type AuthDto = z.infer<typeof BaseAuthSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
export type RegisterDto = z.infer<typeof RegisterSchema>;
export type RegisterFormDto = RegisterDto & {
	passwordConfirm: string;
};
