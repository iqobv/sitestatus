'use client';

import { Checkbox } from '@/components/ui';
import { SettingType } from './AlertSettingsForm';

interface AlertSettingsFormGlobalProps {
	type: SettingType;
	overrideSettings: boolean;
	setOverrideSettings: (value: boolean) => void;
}

const AlertSettingsFormGlobal = ({
	type,
	overrideSettings,
	setOverrideSettings,
}: AlertSettingsFormGlobalProps) => {
	return (
		<div>
			<p>
				Your {type} is currently using global alert settings. To override and
				set up custom alert settings for this
				{type}, toggle the "Override Global Settings" option below.
			</p>
			<Checkbox
				label="Override Global Settings"
				checked={overrideSettings}
				onChange={(e) => setOverrideSettings(e.target.checked)}
			/>
		</div>
	);
};

export default AlertSettingsFormGlobal;
