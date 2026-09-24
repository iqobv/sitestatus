import { Button } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import Link from 'next/link';
import { SettingsCardProps } from '../SettingsCard/SettingsCard.types';

export const SECURITY_SETTINGS_ITEMS: SettingsCardProps[] = [
	{
		title: 'Change Password',
		description: 'Update your password',
		action: (
			<Button variant="outlined" fullWidth asChild>
				<Link href={PRIVATE_PAGES.SETTINGS.CHANGE_PASSWORD}>
					Change Password
				</Link>
			</Button>
		),
	},
	{
		title: 'Active Sessions',
		description: 'View and manage your active sessions',
		action: (
			<Button variant="outlined" fullWidth asChild>
				<Link href={PRIVATE_PAGES.SETTINGS.SESSIONS}>Manage Sessions</Link>
			</Button>
		),
	},
];
