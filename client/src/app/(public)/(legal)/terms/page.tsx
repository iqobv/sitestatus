import { LegalWrapper } from '@/components/layout';
import { getLegalDocument } from '@/utils/legal.util';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Terms of Service',
	description:
		'Read our Terms of Service to understand the rules and regulations for using our website.',
};

export default function TermsOfServicePage() {
	const document = getLegalDocument('terms');

	return <LegalWrapper document={document} />;
}
