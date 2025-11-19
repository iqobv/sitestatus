import z from 'zod';
import { BaseAuthSchema } from './baseAuth.schema';

export const LoginSchema = BaseAuthSchema.extend({
	password: z.string().nonempty({ error: 'Password is required' }),
});
