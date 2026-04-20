export interface ApiMessageResponse {
	code: string;
	message: string;
	field?: string;
}

export interface ApiErrorResponse extends ApiMessageResponse {}
