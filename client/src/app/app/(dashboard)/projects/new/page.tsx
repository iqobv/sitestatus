import { CreateProject } from '@/components/projects/ProjectForms/CreateProject/CreateProject';
import { BackButton, SectionHeader } from '@/components/ui';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'New Project',
};

export default function NewProjectPage() {
	return (
		<Suspense fallback={null}>
			<div>
				<BackButton />
				<SectionHeader title="Create Project" />
				<CreateProject />
			</div>
		</Suspense>
	);
}
