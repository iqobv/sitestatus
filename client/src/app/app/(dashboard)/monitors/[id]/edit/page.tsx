import { UpdateMonitor } from '@/components/monitors/UpdateMonitor/UpdateMonitor';
import { BackButton, SectionHeader } from '@/components/ui';

interface EditMonitorPageProps {
	params: Promise<{ id: string }>;
}

export default async function EditMonitorPage({
	params,
}: EditMonitorPageProps) {
	const { id } = await params;

	return (
		<div className="container">
			<BackButton />
			<SectionHeader
				title="Edit Monitor"
				description="Update the details of your monitor"
			/>
			<UpdateMonitor monitorId={id} />
		</div>
	);
}
