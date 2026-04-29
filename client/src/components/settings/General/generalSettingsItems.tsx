'use client';

import { TextField } from '@/components/ui';
import { User } from '@/types';
import { SettingsCardProps } from '../SettingsCard/SettingsCard.types';
import DeleteAccount from './DeleteAccount';
import ThemeSwitcher from './ThemeSwitcher';

export const GENERAL_SETTINGS_ITEMS = (
	user?: User | null,
): SettingsCardProps[] => [
	{
		title: 'Email',
		description: 'Configure your email settings',
		action: <TextField defaultValue={user?.email} readOnly />,
	},
	{
		title: 'Theme',
		description: 'Configure your theme settings',
		action: <ThemeSwitcher />,
		desktopDirection: 'row',
	},
	{
		title: 'Delete Account',
		description:
			'Permanent removal of account and all associated data. This action cannot be undone.',
		action: <DeleteAccount />,
		desktopDirection: 'row',
	},
];
