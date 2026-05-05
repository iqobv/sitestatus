'use client';

import { Checkbox, Form, Modal } from '@/components/ui';
import { UpsertAlertSettingsDto } from '@/dto';
import { upsertAlertSettingsSchema } from '@/schemas';
import { capitalize } from '@/utils';
import AlertSettingsFormChannels from './AlertSettingsFormChannels';
import AlertSettingsFormFields from './AlertSettingsFormFields';
import AlertSettingsFormFooter from './AlertSettingsFormFooter';
import AlertSettingsFormGlobal from './AlertSettingsFormGlobal';
import { useAlertSettingsForm } from './useAlertSettingsForm.hook';

export type SettingType = 'monitor' | 'project';

export interface AlertSettingsFormProps {
	id: string;
	type: SettingType;
}

const AlertSettingsForm = ({ id, type }: AlertSettingsFormProps) => {
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
							<Modal.Header>{capitalize(type)} Alert Settings</Modal.Header>
							<Modal.Body>
								{isGlobalSettings && (
									<AlertSettingsFormGlobal
										type={type}
										overrideSettings={overrideSettings}
										setOverrideSettings={setOverrideSettings}
									/>
								)}
								<Form.Field name="isEnabled">
									<Checkbox
										label="Enable Alerts"
										error={errors.isEnabled?.message as string}
										disabled={isGlobalSettings && !overrideSettings}
									/>
								</Form.Field>
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
							</Modal.Body>
							<AlertSettingsFormFooter isPending={isPending} />
						</>
					)}
				</Form>
			)}
		</>
	);
};

export default AlertSettingsForm;
