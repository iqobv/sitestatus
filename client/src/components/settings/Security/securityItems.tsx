import { Button } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { SettingsCardProps } from '../SettingsCard/SettingsCard.types';

export const SECURITY_SETTINGS_ITEMS: SettingsCardProps[] = [
	{
		title: 'Change Password',
		description: 'Update your password',
		action: (
			<Button
				variant="outlined"
				fullWidth
				href={PRIVATE_PAGES.SETTINGS.CHANGE_PASSWORD}
			>
				Change Password
			</Button>
		),
	},
	{
		title: 'Active Sessions',
		description: 'View and manage your active sessions',
		action: (
			<Button
				variant="outlined"
				fullWidth
				href={PRIVATE_PAGES.SETTINGS.SESSIONS}
			>
				Manage Sessions
			</Button>
		),
	},
];
