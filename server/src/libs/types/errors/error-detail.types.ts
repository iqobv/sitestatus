export interface ErrorDetail<K, V> {
	code: K;
	message: V;
}

export interface ErrorResponse {
	message: string;
	code: string;
}
