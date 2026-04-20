'use client';

import { createProject } from '@/api';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { CreateProjectDto } from '@/dto';
import { createProjectSchema } from '@/schemas';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import ProjectForm from '../../ProjectForm/ProjectForm';
import { CREATE_PROJECT_FIELDS } from './createProjectFields';

const CreateProject = () => {
	const router = useRouter();

	const defaultValues = useMemo(
		() => ({
			name: '',
			description: '',
			slug: '',
			isAutoSync: true,
		}),
		[],
	);

	return (
		<ProjectForm<CreateProjectDto>
			schema={createProjectSchema}
			fields={CREATE_PROJECT_FIELDS}
			mutationOptions={{
				mutationFn: (data) => createProject(data),
				mutationKey: QUERY_KEYS.project.create,
				onSuccess: (data) => router.push(PRIVATE_PAGES.PROJECTS.ID(data.id)),
			}}
			defaultValues={defaultValues}
			buttonLabel="Create Project"
		/>
	);
};

export default CreateProject;
