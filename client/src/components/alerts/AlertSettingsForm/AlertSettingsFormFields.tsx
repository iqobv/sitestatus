'use client';

import { GLOBAL_ALERT_SETTINGS_FIELDS } from '@/components/settings/Alerting/GlobalAlertSettings/globalAlertSettingsFields';
import { Checkbox, Form, TextField } from '@/components/ui';
import { UpsertAlertSettingsDto } from '@/dto';
import { FieldErrors } from 'react-hook-form';

interface AlertSettingsFormFieldsProps {
	errors: FieldErrors<UpsertAlertSettingsDto>;
	isGlobalSettings: boolean;
	overrideSettings: boolean;
}

const AlertSettingsFormFields = ({
	errors,
	isGlobalSettings,
	overrideSettings,
}: AlertSettingsFormFieldsProps) => {
	return (
		<>
			{GLOBAL_ALERT_SETTINGS_FIELDS.map((f) => (
				<Form.Field key={f.name} name={f.name as keyof UpsertAlertSettingsDto}>
					{({ field }) => {
						const errorMessage =
							(errors[f.name as keyof typeof errors]?.message as string) ?? '';

						if (f.type === 'checkbox') {
							return (
								<Checkbox
									label={f.label}
									error={errorMessage}
									disabled={isGlobalSettings && !overrideSettings}
									{...field}
									checked={Boolean(field.value)}
								/>
							);
						}

						return (
							<TextField
								type={f.type}
								label={f.label}
								placeholder={f.placeholder}
								error={errorMessage}
								disabled={isGlobalSettings && !overrideSettings}
								{...field}
							/>
						);
					}}
				</Form.Field>
			))}
		</>
	);
};

export default AlertSettingsFormFields;
