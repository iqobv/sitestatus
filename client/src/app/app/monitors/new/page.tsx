import { CreateMonitor } from '@/components/monitors';
import { BackButton, SectionHeader } from '@/components/ui';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Create Monitor',
	description: 'Create a new monitor to track your website uptime',
};

export default function MonitorCreatePage() {
	return (
		<div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
			<BackButton />
			<SectionHeader title="Create Monitor" />
			<Suspense fallback={null}>
				<CreateMonitor />
			</Suspense>
		</div>
	);
}
