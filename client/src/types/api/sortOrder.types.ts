export const SortOrder = {
	desc: 'desc',
	asc: 'asc',
} as const;

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
