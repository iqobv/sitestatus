export const HttpMethod = {
	GET: 'GET',
	HEAD: 'HEAD',
	OPTIONS: 'OPTIONS',
} as const;

export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];
