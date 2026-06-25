import { parseAsIndex, parseAsInteger, parseAsStringEnum } from 'nuqs/server';

const createStringEnumParser = <T extends Record<string, string>>(
	obj: T,
	defaultValue: T[keyof T],
) => {
	const values = Object.values(obj) as [T[keyof T], ...T[keyof T][]];

	return parseAsStringEnum(values).withDefault(defaultValue);
};

export const createTableParsers = <
	TBy extends Record<string, string>,
	TOrder extends Record<string, string>,
>(
	sortByObj: TBy,
	defaultSortBy: TBy[keyof TBy],
	sortOrderObj: TOrder,
	defaultSortOrder: TOrder[keyof TOrder],
) => ({
	page: parseAsIndex.withDefault(0),
	limit: parseAsInteger.withDefault(20),
	sortBy: createStringEnumParser(sortByObj, defaultSortBy),
	sortOrder: createStringEnumParser(sortOrderObj, defaultSortOrder),
});
