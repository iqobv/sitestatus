'use client';

import { useAuth } from '@/hooks';
import SettingsCard from '../SettingsCard/SettingsCard';
import SettingsWrapper from '../SettingsWrapper/SettingsWrapper';
import { GENERAL_SETTINGS_ITEMS } from './generalSettingsItems';

const General = () => {
	const { user } = useAuth();

	return (
		<SettingsWrapper title="General">
			{GENERAL_SETTINGS_ITEMS(user).map((item, index) => (
				<SettingsCard key={index} {...item} />
			))}
		</SettingsWrapper>
	);
};

export default General;
