'use client';

import { useAuth } from '@/hooks/useAuth.hook';
import { SettingsCard } from '../SettingsCard/SettingsCard';
import { SettingsWrapper } from '../SettingsWrapper/SettingsWrapper';
import { GENERAL_SETTINGS_ITEMS } from './generalSettingsItems';

export const General = () => {
	const { user } = useAuth();

	return (
		<SettingsWrapper title="General">
			{GENERAL_SETTINGS_ITEMS(user).map((item, index) => (
				<SettingsCard key={index} {...item} />
			))}
		</SettingsWrapper>
	);
};
