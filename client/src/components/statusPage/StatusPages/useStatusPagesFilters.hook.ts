'use client';

import { useQueryStates } from 'nuqs';
import { statusPagesFiltersParsers } from './statusPages.searchParams';

export const useStatusPagesFilters = () => {
	return useQueryStates(statusPagesFiltersParsers);
};
