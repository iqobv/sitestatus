'use client';

import { upsertAlertSettings } from '@/api';
import { Button, Checkbox, Form, Modal, TextField } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { UpsertAlertSettingsDto } from '@/dto';
import { upsertAlertSettingsSchema } from '@/schemas';
import { AlertSettings } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { GLOBAL_ALERT_SETTINGS_FIELDS } from './globalAlertSettingsFields';

interface GlobalAlertSettingsEditProps {
	data: AlertSettings;
}

const GlobalAlertSettingsEdit = ({ data }: GlobalAlertSettingsEditProps) => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: (dto: UpsertAlertSettingsDto) => upsertAlertSettings(dto),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.alertSettings.hierarchy('global'),
			});
			toast.success('Global alert settings updated successfully');
		},
		onError: (e: Error) => {
			toast.error(e.message || 'Failed to update global alert settings');
		},
	});

	return (
		<Modal>
			<Modal.Trigger>
				<Button variant="outlined" disabled={isPending}>
					Edit
				</Button>
			</Modal.Trigger>
			<Modal.Content>
				<Form<UpsertAlertSettingsDto>
					schema={upsertAlertSettingsSchema}
					defaultValues={{
						isEnabled: data.isEnabled,
						onDown: data.onDown,
						onUp: data.onUp,
						delay: data.delay,
						channelIds: data.channels.map((c) => c.id),
						monitorId: data.monitorId ?? undefined,
						projectId: data.projectId ?? undefined,
					}}
					onSubmit={(formData) => mutate(formData)}
				>
					{({ formState: { errors } }) => {
						return (
							<>
								<Modal.Header>Edit Global Alert Settings</Modal.Header>
								<Modal.Body>
									{GLOBAL_ALERT_SETTINGS_FIELDS.map((f) => (
										<Form.Field
											key={f.name}
											name={f.name as keyof UpsertAlertSettingsDto}
										>
											{({ field }) => {
												const errorMessage =
													(errors[f.name as keyof typeof errors]
														?.message as string) ?? '';

												if (f.type === 'checkbox') {
													return (
														<Checkbox
															label={f.label}
															error={errorMessage}
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
														{...field}
													/>
												);
											}}
										</Form.Field>
									))}
								</Modal.Body>
								<Modal.Footer>
									<Form.Actions justifyContent="flex-end">
										<Modal.Close>
											<Form.Reset buttonProps={{ variant: 'outlined' }}>
												Cancel
											</Form.Reset>
										</Modal.Close>
										<Form.Submit disabledOnEmpty>Save</Form.Submit>
									</Form.Actions>
								</Modal.Footer>
							</>
						);
					}}
				</Form>
			</Modal.Content>
		</Modal>
	);
};

export default GlobalAlertSettingsEdit;
