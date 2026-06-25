'use client';

import { FormField, Select } from '@/components/ui';
import { NotificationChannel } from '@/types/notificationChannel/notificationChannel.types';

interface AlertSettingsFormChannelsProps {
	notificationChannels: NotificationChannel[];
	isGlobalSettings: boolean;
	overrideSettings: boolean;
}

export const AlertSettingsFormChannels = ({
	notificationChannels,
	isGlobalSettings,
	overrideSettings,
}: AlertSettingsFormChannelsProps) => {
	return (
		<FormField isController name="channelIds">
			{({ field }) => (
				<Select
					label="Notification Channels"
					placeholder="Select notification channels"
					options={notificationChannels
						.filter((c) => c.isActive)
						.map((channel) => ({
							label: channel.name,
							value: channel.id,
						}))}
					value={field.value}
					onChange={(value) => field.onChange(value)}
					multiple
					disabled={isGlobalSettings && !overrideSettings}
				/>
			)}
		</FormField>
	);
};
