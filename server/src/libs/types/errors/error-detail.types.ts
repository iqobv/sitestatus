export interface ErrorDetail<K, V> {
	code: K;
	message: V;
	field?: string;
}

export interface ErrorResponse {
	message: string;
	code: string;
	field?: string;
}
