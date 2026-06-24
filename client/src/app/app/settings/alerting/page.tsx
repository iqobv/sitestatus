import { Alerting } from '@/components/settings/Alerting/Alerting';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Alerting Settings',
};

export default function SettingsAlertingPage() {
	return <Alerting />;
}
