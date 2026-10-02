export const Method = {
	GET: 'GET',
	OPTIONS: 'OPTIONS',
} as const;

export type Method = (typeof Method)[keyof typeof Method];
