export interface PaginatedMetadata {
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

export interface PaginatedData<T> {
	data: T[];
	meta: PaginatedMetadata;
}
