import { EditProject } from '@/components/projects';
import { BackButton, SectionHeader } from '@/components/ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Edit Project',
};

export default function EditProjectPage() {
	return (
		<div>
			<BackButton />
			<SectionHeader title="Edit Project" />
			<EditProject />
		</div>
	);
}
