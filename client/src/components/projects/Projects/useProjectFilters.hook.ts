'use client';

import { useQueryStates } from 'nuqs';
import { projectFiltersParsers } from './projects.searchParams';

export const useProjectFilters = () => {
	return useQueryStates(projectFiltersParsers);
};
