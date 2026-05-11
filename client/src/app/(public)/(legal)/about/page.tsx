import { LegalWrapper } from '@/components/layout';
import { getLegalDocument } from '@/utils/legal.util';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About Us',
	description:
		'Learn more about SiteStatus and our mission to provide reliable uptime monitoring.',
};

export default function AboutUsPage() {
	const document = getLegalDocument('about');

	return <LegalWrapper document={document} />;
}
