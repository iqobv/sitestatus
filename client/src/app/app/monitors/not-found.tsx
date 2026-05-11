import { NotFoundWrapper } from '@/components/layout';
import { PRIVATE_PAGES } from '@/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Monitor Not Found',
	description: 'The monitor you are looking for does not exist.',
};

export default function NotFound() {
	return (
		<NotFoundWrapper
			title="Monitor Not Found"
			description="The monitor you are looking for does not exist."
			href={PRIVATE_PAGES.DASHBOARD}
		/>
	);
}
