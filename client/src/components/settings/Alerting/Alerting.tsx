'use client';

import SettingsWrapper from '../SettingsWrapper/SettingsWrapper';
import { GlobalAlertSettings } from './GlobalAlertSettings';
import { NotificationChannels } from './NotificationChannels';

const Alerting = () => {
	return (
		<SettingsWrapper title="Alerting">
			<GlobalAlertSettings />
			<NotificationChannels />
		</SettingsWrapper>
	);
};

export default Alerting;
