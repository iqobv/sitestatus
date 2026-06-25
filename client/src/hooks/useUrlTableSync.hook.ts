'use client';

import { SortOrder } from '@/types/api/sortOrder.types';
import { PaginationState, SortingState, Updater } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { usePaginationBounds } from './usePaginationBounds.hook';

interface UseUrlTableSyncProps<TSortBy extends string> {
	page: number;
	limit: number;
	sortBy: TSortBy | null;
	sortOrder: SortOrder | null;
	setFilters: (filters: {
		page?: number | null;
		limit?: number | null;
		sortBy?: TSortBy | null;
		sortOrder?: SortOrder | null;
	}) => void;
	totalPages: number;
}

export const useUrlTableSync = <TSortBy extends string>({
	page,
	limit,
	sortBy,
	sortOrder,
	setFilters,
	totalPages,
}: UseUrlTableSyncProps<TSortBy>) => {
	const pagination: PaginationState = useMemo(
		() => ({
			pageIndex: page,
			pageSize: limit,
		}),
		[page, limit],
	);

	const sorting: SortingState = useMemo(
		() => (sortBy ? [{ id: sortBy, desc: sortOrder === SortOrder.desc }] : []),
		[sortBy, sortOrder],
	);

	usePaginationBounds(
		page,
		(validPage) => setFilters({ page: validPage }),
		totalPages,
	);

	const handlePaginationChange = useCallback(
		(updater: Updater<PaginationState>) => {
			const newPagination =
				typeof updater === 'function' ? updater(pagination) : updater;

			setFilters({
				page: newPagination.pageIndex,
				limit: newPagination.pageSize,
			});
		},
		[pagination, setFilters],
	);

	const handleSortingChange = useCallback(
		(updater: Updater<SortingState>) => {
			const newSortingState =
				typeof updater === 'function' ? updater(sorting) : updater;

			if (newSortingState.length === 0) {
				setFilters({ sortBy: null, sortOrder: null, page: 0 });
				return;
			}

			const { id, desc } = newSortingState[0];

			setFilters({
				sortBy: id as TSortBy,
				sortOrder: desc ? SortOrder.desc : SortOrder.asc,
				page: 0,
			});
		},
		[sorting, setFilters],
	);

	return {
		pagination,
		sorting,
		handlePaginationChange,
		handleSortingChange,
	};
};
