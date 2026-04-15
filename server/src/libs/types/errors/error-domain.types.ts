import { ErrorDetail } from './error-detail.types';

export type ErrorDomain<T extends Record<string, string>> = {
	[K in keyof T]: ErrorDetail<K, T[K]>;
};
