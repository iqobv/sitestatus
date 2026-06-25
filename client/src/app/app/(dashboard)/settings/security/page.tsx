import { Security } from '@/components/settings/Security/Security';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Security Settings',
};

export default function SettingsSecurityPage() {
	return <Security />;
}
