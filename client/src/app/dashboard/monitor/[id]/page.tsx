import { Monitor } from '@/components/monitors';
import { IMonitorWithPingResults } from '@/types';
import { serverFetcher } from '@/utils';

interface MonitorPageProps {
	params: Promise<{ id: string }>;
}

export default async function MonitorPage({ params }: MonitorPageProps) {
	const { id } = await params;

	const initialMonitor = await serverFetcher<IMonitorWithPingResults>(
		`/v1/monitors/id/${id}`,
		{
			method: 'GET',
			cache: 'no-store',
		}
	).catch(() => null);

	return (
		<div className="page container fade">
			<Monitor id={id} initialData={initialMonitor} />
		</div>
	);
}
