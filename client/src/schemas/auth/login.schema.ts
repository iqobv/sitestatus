import z from 'zod';
import { baseAuthSchema } from './baseAuth.schema';

export const loginSchema = baseAuthSchema.extend({
	password: z.string().nonempty({ error: 'Password is required' }),
});
