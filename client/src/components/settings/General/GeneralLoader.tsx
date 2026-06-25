import { SettingsWrapperLoader } from '../SettingsWrapper/SettingsWrapperLoader';
import { GENERAL_SETTINGS_ITEMS } from './generalSettingsItems';

export const GeneralLoader = () => {
	return <SettingsWrapperLoader count={GENERAL_SETTINGS_ITEMS.length} />;
};
