import { General } from '@/components/settings/General/General';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'General Settings',
};

export default function SettingsPage() {
	return <General />;
}
