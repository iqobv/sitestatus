'use client';

import {
	Checkbox,
	Form,
	FormField,
	ModalBody,
	ModalHeader,
} from '@/components/ui';
import { UpsertAlertSettingsDto } from '@/dto/alertSettings.dto';
import { upsertAlertSettingsSchema } from '@/schemas/alertSettings/upsertAlertSettings.schema';
import { capitalize } from '@/utils/capitalize.util';
import { AlertSettingsFormChannels } from './AlertSettingsFormChannels';
import { AlertSettingsFormFields } from './AlertSettingsFormFields';
import { AlertSettingsFormFooter } from './AlertSettingsFormFooter';
import { AlertSettingsFormGlobal } from './AlertSettingsFormGlobal';
import { useAlertSettingsForm } from './useAlertSettingsForm.hook';

export type SettingType = 'monitor' | 'project';

export interface AlertSettingsFormProps {
	id: string;
	type: SettingType;
}

export const AlertSettingsForm = ({ id, type }: AlertSettingsFormProps) => {
	const {
		currentSettings,
		notificationChannels,
		mutate,
		isPending,
		overrideSettings,
		setOverrideSettings,
		isGlobalSettings,
	} = useAlertSettingsForm({ id, type });

	return (
		<>
			{currentSettings && (
				<Form<UpsertAlertSettingsDto>
					schema={upsertAlertSettingsSchema}
					defaultValues={{
						isEnabled: true,
						onDown: true,
						onUp: true,
						delay: 0,
						channelIds: [],
						monitorId: undefined,
						projectId: undefined,
					}}
					values={{
						isEnabled: currentSettings.isEnabled,
						onDown: currentSettings.onDown,
						onUp: currentSettings.onUp,
						delay: currentSettings.delay,
						channelIds: currentSettings.channels.map((c) => c.id),
						monitorId:
							type === 'monitor'
								? (currentSettings.monitorId ?? id)
								: undefined,
						projectId:
							type === 'project'
								? (currentSettings.projectId ?? id)
								: undefined,
					}}
					onSubmit={(data) => mutate(data)}
				>
					{({ formState: { errors } }) => (
						<>
							<ModalHeader>{capitalize(type)} Alert Settings</ModalHeader>
							<ModalBody>
								{isGlobalSettings && (
									<AlertSettingsFormGlobal
										type={type}
										overrideSettings={overrideSettings}
										setOverrideSettings={setOverrideSettings}
									/>
								)}
								<FormField name="isEnabled">
									<Checkbox
										label="Enable Alerts"
										error={errors.isEnabled?.message as string}
										disabled={isGlobalSettings && !overrideSettings}
									/>
								</FormField>
								<AlertSettingsFormFields
									errors={errors}
									isGlobalSettings={isGlobalSettings}
									overrideSettings={overrideSettings}
								/>
								{notificationChannels && notificationChannels.length > 0 && (
									<AlertSettingsFormChannels
										notificationChannels={notificationChannels}
										isGlobalSettings={isGlobalSettings}
										overrideSettings={overrideSettings}
									/>
								)}
							</ModalBody>
							<AlertSettingsFormFooter isPending={isPending} />
						</>
					)}
				</Form>
			)}
		</>
	);
};
