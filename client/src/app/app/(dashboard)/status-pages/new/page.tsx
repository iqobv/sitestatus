import { StatusPageCreate } from '@/components/statusPage/StatusPageCreate/StatusPageCreate';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'New Status Page',
};

export default function NewStatusPage() {
	return <StatusPageCreate />;
}
