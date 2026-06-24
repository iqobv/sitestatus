'use client';

import { createProject } from '@/api';
import { PRIVATE_PAGES } from '@/config';
import { CreateProjectDto } from '@/dto';
import { createProjectSchema } from '@/schemas';
import { useRouter } from 'next/navigation';
import { ProjectForm } from '../../ProjectForm/ProjectForm';
import { CREATE_PROJECT_FIELDS } from './createProjectFields';

export const CreateProject = () => {
	const router = useRouter();

	return (
		<ProjectForm<CreateProjectDto>
			schema={createProjectSchema}
			fields={CREATE_PROJECT_FIELDS}
			mutationOptions={{
				mutationFn: (data) => createProject(data),
				onSuccess: (data) => router.push(PRIVATE_PAGES.PROJECTS.ID(data.id)),
			}}
			defaultValues={{
				name: '',
				description: '',
			}}
			buttonLabel="Create Project"
		/>
	);
};
