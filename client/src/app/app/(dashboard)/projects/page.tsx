import { Projects } from '@/components/projects/Projects/Projects';
import { ProjectsHeader } from '@/components/projects/ProjectsHeader/ProjectsHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Projects',
};

export default function ProjectsPage() {
	return (
		<>
			<ProjectsHeader />
			<Projects />
		</>
	);
}
