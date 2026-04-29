import { Alerting } from '@/components/settings';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Alerting Settings',
};

export default function SettingsAlertingPage() {
	return <Alerting />;
}
