import SettingsWrapperLoader from '../SettingsWrapper/SettingsWrapperLoader';
import { GENERAL_SETTINGS_ITEMS } from './generalSettingsItems';

const GeneralLoader = () => {
	return <SettingsWrapperLoader count={GENERAL_SETTINGS_ITEMS.length} />;
};

export default GeneralLoader;
