import { Monitor } from '@/components/monitors';

interface MonitorPageProps {
	params: Promise<{ id: string }>;
}

export default async function MonitorPage({ params }: MonitorPageProps) {
	const { id } = await params;

	return (
		<div className="page container">
			<Monitor id={id} />
		</div>
	);
}
