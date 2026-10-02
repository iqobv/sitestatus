import { StatusPages } from '@/components/statusPage/StatusPages/StatusPages';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Status Pages',
};

export default function StatusPagesPage() {
	return <StatusPages />;
}
