'use client';

import { getAllProjects } from '@/api/project/getAllProjects.api';
import { Field, FormCombobox } from '@/components/ui';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { BaseProjectMonitorDto } from '@/dto/monitor.dto';
import { useDebounce } from '@/hooks/useDebounce.hook';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const MonitorFormProject = () => {
	const { control } = useFormContext<BaseProjectMonitorDto>();
	const [searchValue, setSearchValue] = useState('');
	const debouncedSearchValue = useDebounce(searchValue, 300);

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: QUERY_KEYS.projects.infinite({ search: debouncedSearchValue }),
			queryFn: ({ pageParam }) =>
				getAllProjects({
					page: pageParam,
					limit: 20,
					sortOrder: 'asc',
					sortBy: 'name',
					search: debouncedSearchValue,
				}),
			initialPageParam: 1,
			getNextPageParam: (lastPage) =>
				lastPage.meta.page < lastPage.meta.totalPages
					? lastPage.meta.page + 1
					: undefined,
		});

	const options = data?.pages.flatMap((page) => page.data) || [];

	return (
		<Field>
			<FormCombobox<BaseProjectMonitorDto>
				name="projectId"
				control={control}
				options={options.map((project) => ({
					label: project.name,
					value: project.id,
				}))}
				placeholder="Select a project"
				isClearable
				isLoading={isFetchingNextPage}
				onScrollEnd={() => {
					if (hasNextPage && !isFetchingNextPage) fetchNextPage();
				}}
				emptyMessage="No projects found"
				searchValue={searchValue}
				onSearchChange={setSearchValue}
				shouldFilter={false}
			/>
		</Field>
	);
};
