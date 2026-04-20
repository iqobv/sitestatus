'use client';

import { getProjectById, updateProject } from '@/api';
import { QUERY_KEYS } from '@/config';
import { UpdateProjectDto } from '@/dto';
import { updateProjectSchema } from '@/schemas';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import ProjectForm from '../../ProjectForm/ProjectForm';
import { EDIT_PROJECT_FIELDS } from './editProjectFields';
import EditProjectLoader from './EditProjectLoader';

const EditProject = () => {
	const { id } = useParams<{ id: string }>();

	const { data, isLoading, refetch } = useQuery({
		queryKey: QUERY_KEYS.project.byId(id),
		queryFn: () => getProjectById(id),
		enabled: !!id,
	});

	const defaultValues = useMemo(
		() => ({
			name: data?.name ?? '',
			slug: data?.slug ?? '',
			description: data?.description ?? '',
			isAutoSync: false,
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
				mutationKey: QUERY_KEYS.project.update(id),
				onSuccess: () => {
					refetch();
				},
			}}
			defaultValues={defaultValues}
			isEdit
			buttonLabel="Update Project"
		/>
	);
};

export default EditProject;
