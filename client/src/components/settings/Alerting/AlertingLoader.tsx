import SettingsWrapperLoader from '../SettingsWrapper/SettingsWrapperLoader';
import { GlobalAlertSettingsLoader } from './GlobalAlertSettings';
import { NotificationChannelsLoader } from './NotificationChannels';

const AlertingLoader = () => {
	return (
		<SettingsWrapperLoader count={0}>
			<GlobalAlertSettingsLoader />
			<NotificationChannelsLoader />
		</SettingsWrapperLoader>
	);
};

export default AlertingLoader;
