import { NotFoundWrapper } from '@/components/layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Project Not Found',
	description: 'The project you are looking for does not exist.',
};

export default function NotFound() {
	return (
		<NotFoundWrapper
			title="Project Not Found"
			description="The project you are looking for does not exist."
		/>
	);
}
