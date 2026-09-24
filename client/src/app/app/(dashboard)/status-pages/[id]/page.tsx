import { StatusPageDetails } from '@/components/statusPage/StatusPageDetails/StatusPageDetails';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Status Page',
};

export default function StatusPageDetailPage() {
	return <StatusPageDetails />;
}
