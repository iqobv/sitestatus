import SettingsWrapperLoader from '../SettingsWrapper/SettingsWrapperLoader';
import NotificationChannelsListLoader from './NotificationChannelsList/NotificationChannelsListLoader';

const AlertingLoader = () => {
	return (
		<SettingsWrapperLoader count={0}>
			<NotificationChannelsListLoader />
		</SettingsWrapperLoader>
	);
};

export default AlertingLoader;
