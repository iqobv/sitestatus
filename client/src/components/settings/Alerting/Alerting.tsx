'use client';

import { SettingsWrapper } from '../SettingsWrapper/SettingsWrapper';
import { GlobalAlertSettings } from './GlobalAlertSettings/GlobalAlertSettings';
import { NotificationChannels } from './NotificationChannels/NotificationChannels';

export const Alerting = () => {
	return (
		<SettingsWrapper title="Alerting">
			<GlobalAlertSettings />
			<NotificationChannels />
		</SettingsWrapper>
	);
};
