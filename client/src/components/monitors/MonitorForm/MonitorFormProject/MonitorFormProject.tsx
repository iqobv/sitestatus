'use client';

import { getAllProjects } from '@/api/project/getAllProjects.api';
import { Select } from '@/components/ui';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { BaseProjectMonitorDto } from '@/dto/monitor.dto';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';

export const MonitorFormProject = () => {
	const { control } = useFormContext<BaseProjectMonitorDto>();

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: QUERY_KEYS.projects.infinite(),
			queryFn: ({ pageParam }) =>
				getAllProjects({
					page: pageParam,
					limit: 20,
					sortOrder: 'asc',
					sortBy: 'name',
				}),
			initialPageParam: 1,
			getNextPageParam: (lastPage) =>
				lastPage.meta.page < lastPage.meta.totalPages
					? lastPage.meta.page + 1
					: undefined,
		});

	const options = data?.pages.flatMap((page) => page.data) || [];

	return (
		<Controller
			name="projectId"
			control={control}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<Select
					label="Project"
					options={[
						{ value: '', label: 'Select a project' },
						...options.map((project) => ({
							value: project.id,
							label: project.name,
						})),
					]}
					onScrollEnd={hasNextPage ? fetchNextPage : undefined}
					isLoading={isFetchingNextPage}
					error={error?.message}
					placeholder="Select a project"
					value={value || ''}
					onChange={onChange}
				/>
			)}
		/>
	);
};
