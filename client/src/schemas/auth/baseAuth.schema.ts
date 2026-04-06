import { emailSchema } from './email.schema';
import { passwordSchema } from './password.schema';

export const baseAuthSchema = emailSchema.extend(passwordSchema.shape);
