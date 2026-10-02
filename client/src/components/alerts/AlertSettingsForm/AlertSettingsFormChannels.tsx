'use client';

import { Field, FormMultiCombobox } from '@/components/ui';
import { UpsertAlertSettingsDto } from '@/dto/alertSettings.dto';
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
		<Field
			disabled={isGlobalSettings && !overrideSettings}
			label="Notification Channels"
		>
			<FormMultiCombobox<UpsertAlertSettingsDto>
				name="channelIds"
				placeholder="Select notification channels"
				options={notificationChannels
					.filter((c) => c.isActive)
					.map((c) => ({
						label: c.name,
						value: c.id,
					}))}
				disabled={isGlobalSettings && !overrideSettings}
				zIndex={1050}
				menuWidth="trigger"
			/>
		</Field>
	);
};
