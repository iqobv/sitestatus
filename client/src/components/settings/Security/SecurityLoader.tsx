import SettingsWrapperLoader from '../SettingsWrapper/SettingsWrapperLoader';
import { SECURITY_SETTINGS_ITEMS } from './securityItems';

const SecurityLoader = () => {
	return <SettingsWrapperLoader count={SECURITY_SETTINGS_ITEMS.length} />;
};

export default SecurityLoader;
