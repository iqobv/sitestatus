import { Sessions } from '@/components/settings';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Active Sessions',
};

export default function SessionsPage() {
	return <Sessions />;
}
