import { z } from 'zod';
import { HttpMethod } from '../types/http-method.types.js';

export const monitorTaskSchema = z.object({
	monitorId: z.uuidv4(),
	url: z.url(),
	method: z.enum(HttpMethod).optional().default('GET'),
});
