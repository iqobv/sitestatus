import { NotFoundWrapper } from '@/components/layout';
import { PRIVATE_PAGES } from '@/config';
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
			href={PRIVATE_PAGES.DASHBOARD}
		/>
	);
}
