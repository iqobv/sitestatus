import { SettingsWrapperLoader } from '../SettingsWrapper/SettingsWrapperLoader';
import { GlobalAlertSettingsLoader } from './GlobalAlertSettings/GlobalAlertSettingsLoader';
import { NotificationChannelsLoader } from './NotificationChannels/NotificationChannelsLoader';

export const AlertingLoader = () => {
	return (
		<SettingsWrapperLoader count={0}>
			<GlobalAlertSettingsLoader />
			<NotificationChannelsLoader />
		</SettingsWrapperLoader>
	);
};
