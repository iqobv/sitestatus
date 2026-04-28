import { LegalWrapper } from '@/components/layout';
import { getLegalDocument } from '@/utils/legal.util';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cookie Policy',
	description:
		'Read our Cookie Policy to understand how we use cookies and similar technologies.',
};

export default function CookiePolicyPage() {
	const document = getLegalDocument('cookies');

	return <LegalWrapper document={document} />;
}
