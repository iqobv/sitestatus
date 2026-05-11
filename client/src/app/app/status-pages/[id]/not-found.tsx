import { NotFoundWrapper } from '@/components/layout';
import { PRIVATE_PAGES } from '@/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Status Page Not Found',
	description: 'The status page you are looking for does not exist.',
};

export default function NotFound() {
	return (
		<NotFoundWrapper
			title="Status Page Not Found"
			description="The status page you are looking for does not exist."
			href={PRIVATE_PAGES.STATUS_PAGES.ALL}
		/>
	);
}
