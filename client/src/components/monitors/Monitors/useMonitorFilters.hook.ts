'use client';

import { useQueryStates } from 'nuqs';
import { monitorFiltersParsers } from './monitor.searchParams';

export const useMonitorFilters = () => {
	return useQueryStates(monitorFiltersParsers);
};
