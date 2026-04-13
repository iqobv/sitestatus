export interface ApiMessageResponse {
	code: string;
	message: string;
}

export interface ApiErrorResponse extends ApiMessageResponse {}
