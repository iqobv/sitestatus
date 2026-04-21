'use client';

import { getAllProjects } from '@/api';
import { Select } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { BaseProjectMonitorDto } from '@/dto';
import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';

const MonitorFormProject = () => {
	const { control } = useFormContext<BaseProjectMonitorDto>();

	const { data } = useQuery({
		queryFn: getAllProjects,
		queryKey: QUERY_KEYS.project.all,
	});

	return (
		<Controller
			name="projectId"
			control={control}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<Select
					label="Project"
					options={[
						{ value: '', label: 'Select a project' },
						...(data?.map((project) => ({
							value: project.id,
							label: project.name,
						})) || []),
					]}
					error={error?.message}
					placeholder="Select a project"
					value={value}
					onChange={onChange}
				/>
			)}
		/>
	);
};

export default MonitorFormProject;
