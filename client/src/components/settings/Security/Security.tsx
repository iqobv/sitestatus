'use client';

import SettingsCard from '../SettingsCard/SettingsCard';
import SettingsWrapper from '../SettingsWrapper/SettingsWrapper';
import { SECURITY_SETTINGS_ITEMS } from './securityItems';

const Security = () => {
	return (
		<SettingsWrapper title="Security">
			{SECURITY_SETTINGS_ITEMS.map((item, index) => (
				<SettingsCard key={index} {...item} />
			))}
		</SettingsWrapper>
	);
};

export default Security;
