import { Monitor } from '@/components/monitors/Monitor/Monitor';
import { Metadata } from 'next';

interface MonitorPageProps {
	params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
	title: 'Monitor',
};

export default async function MonitorPage({ params }: MonitorPageProps) {
	const { id } = await params;

	return (
		<div className="fade">
			<Monitor id={id} />
		</div>
	);
}
