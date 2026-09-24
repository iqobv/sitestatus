'use client';

import { GLOBAL_ALERT_SETTINGS_FIELDS } from '@/components/settings/Alerting/GlobalAlertSettings/globalAlertSettingsFields';
import { Checkbox, FormField, TextField } from '@/components/ui';
import { UpsertAlertSettingsDto } from '@/dto/alertSettings.dto';
import { FieldErrors } from 'react-hook-form';

interface AlertSettingsFormFieldsProps {
	errors: FieldErrors<UpsertAlertSettingsDto>;
	isGlobalSettings: boolean;
	overrideSettings: boolean;
}

export const AlertSettingsFormFields = ({
	errors,
	isGlobalSettings,
	overrideSettings,
}: AlertSettingsFormFieldsProps) => {
	return (
		<>
			{GLOBAL_ALERT_SETTINGS_FIELDS.map((f) => (
				<FormField key={f.name} name={f.name as keyof UpsertAlertSettingsDto}>
					{f.type === 'checkbox' ? (
						<Checkbox
							label={f.label}
							error={
								(errors[f.name as keyof typeof errors]?.message as string) ?? ''
							}
							disabled={isGlobalSettings && !overrideSettings}
						/>
					) : (
						<TextField
							type={f.type}
							label={f.label}
							placeholder={f.placeholder}
							error={
								(errors[f.name as keyof typeof errors]?.message as string) ?? ''
							}
							disabled={isGlobalSettings && !overrideSettings}
						/>
					)}
				</FormField>
			))}
		</>
	);
};
