'use client';

import { useCallback, useState } from 'react';

export interface LocalPaginationState {
	page: number;
	limit: number;
}

export const useLocalPagination = (
	initialState: LocalPaginationState = { page: 0, limit: 20 },
) => {
	const [pagination, setPagination] =
		useState<LocalPaginationState>(initialState);

	const setFilters = useCallback(
		(
			updater:
				| Partial<LocalPaginationState>
				| ((prev: LocalPaginationState) => Partial<LocalPaginationState>),
		) => {
			setPagination((prev) => {
				const updates = typeof updater === 'function' ? updater(prev) : updater;
				return { ...prev, ...updates };
			});
		},
		[],
	);

	return [pagination, setFilters] as const;
};
