'use client';

import { createProject } from '@/api/project/createProject.api';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { CreateProjectDto } from '@/dto/project.dto';
import { createProjectSchema } from '@/schemas/project/createProject.schema';
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
