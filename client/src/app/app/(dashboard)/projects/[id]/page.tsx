import { Project } from '@/components/projects/Project/Project';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Project',
};

export default function ProjectPage() {
	return <Project />;
}
