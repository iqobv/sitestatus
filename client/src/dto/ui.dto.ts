import { tablePaginationSchema } from '@/schemas/ui/tablePagination.schema';
import z from 'zod';

export type PaginationQueryDto = z.infer<typeof tablePaginationSchema>;
