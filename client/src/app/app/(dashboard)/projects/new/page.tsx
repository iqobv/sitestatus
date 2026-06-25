import { CreateProject } from '@/components/projects/ProjectForms/CreateProject/CreateProject';
import { BackButton, SectionHeader } from '@/components/ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'New Project',
};

export default function NewProjectPage() {
	return (
		<div>
			<BackButton />
			<SectionHeader title="Create Project" />
			<CreateProject />
		</div>
	);
}
