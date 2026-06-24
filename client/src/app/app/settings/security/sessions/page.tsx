import { Sessions } from '@/components/settings/Sessions/Sessions';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Active Sessions',
};

export default function SessionsPage() {
	return <Sessions />;
}
