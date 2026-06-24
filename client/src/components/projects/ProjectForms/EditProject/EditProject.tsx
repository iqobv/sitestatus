'use client';

import { getProjectById, updateProject } from '@/api';
import { QUERY_KEYS } from '@/config';
import { UpdateProjectDto } from '@/dto';
import { updateProjectSchema } from '@/schemas';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { ProjectForm } from '../../ProjectForm/ProjectForm';
import { EDIT_PROJECT_FIELDS } from './editProjectFields';
import { EditProjectLoader } from './EditProjectLoader';

export const EditProject = () => {
	const { id } = useParams<{ id: string }>();

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.projects.detail(id),
		queryFn: () => getProjectById(id),
		enabled: !!id,
	});

	const defaultValues: UpdateProjectDto = useMemo(
		() => ({
			name: data?.name ?? '',
			description: data?.description ?? '',
		}),
		[data],
	);

	if (isLoading) return <EditProjectLoader />;
	if (!data) return null;

	return (
		<ProjectForm<UpdateProjectDto>
			schema={updateProjectSchema}
			fields={EDIT_PROJECT_FIELDS}
			mutationOptions={{
				mutationFn: (dto) => updateProject(id, dto),
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: QUERY_KEYS.projects.detail(id),
					});
					queryClient.invalidateQueries({
						queryKey: QUERY_KEYS.projects.lists(),
					});
				},
			}}
			defaultValues={defaultValues}
			isEdit
			buttonLabel="Update Project"
		/>
	);
};

export default EditProject;
