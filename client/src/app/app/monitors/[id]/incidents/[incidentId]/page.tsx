import { MonitorIncident } from '@/components/monitors';
import { BackButton, SectionHeader } from '@/components/ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Incident details',
};

export default function IncidentPage() {
	return (
		<div className="container" style={{ paddingBottom: 80 }}>
			<BackButton />
			<SectionHeader
				title="Incident Details"
				description="View the details of your incident and its timeline"
			/>
			<MonitorIncident />
		</div>
	);
}
