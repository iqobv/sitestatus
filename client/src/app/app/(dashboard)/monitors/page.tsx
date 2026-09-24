import { MonitorsAll } from '@/components/monitors/Monitors/MonitorsAll';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Monitors',
};

export default function MonitorsPage() {
	return <MonitorsAll />;
}
