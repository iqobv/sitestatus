import { Monitors } from '@/components/monitors';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Your dashboard overview',
};

export default function DashboardPage() {
	return <Monitors />;
}
