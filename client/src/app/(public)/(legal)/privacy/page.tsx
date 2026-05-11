import { LegalWrapper } from '@/components/layout';
import { getLegalDocument } from '@/utils/legal.util';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Privacy Policy',
	description:
		'Read our Privacy Policy to understand how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
	const document = getLegalDocument('privacy');

	return <LegalWrapper document={document} />;
}
