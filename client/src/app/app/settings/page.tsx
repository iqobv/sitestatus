import { General } from '@/components/settings';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'General Settings',
};

export default function SettingsPage() {
	return <General />;
}
