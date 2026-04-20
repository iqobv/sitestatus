import { ErrorDetail } from '../types';

export const withField = <K, V>(
	error: ErrorDetail<K, V>,
	field: string,
): ErrorDetail<K, V> & { field: string } => {
	return {
		...error,
		field,
	};
};
