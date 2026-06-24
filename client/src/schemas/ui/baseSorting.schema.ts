import z from 'zod';

export const createBaseQuerySortingSchema = <
	TBy extends Record<string, string>,
	TOrder extends Record<string, string>,
>(
	sortByObj: TBy,
	defaultSortBy: TBy[keyof TBy],
	sortOrderObj: TOrder,
	defaultSortOrder: TOrder[keyof TOrder],
) =>
	z.object({
		sortOrder: z.enum(sortOrderObj).optional().default(defaultSortOrder),
		sortBy: z.enum(sortByObj).optional().default(defaultSortBy),
	});
