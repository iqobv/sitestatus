'use client';

import { upsertAlertSettings } from '@/api/alertSettings/upsertAlertSettings.api';
import {
	Button,
	Checkbox,
	Form,
	FormActions,
	FormField,
	FormReset,
	FormSubmit,
	Modal,
	ModalBody,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalTrigger,
	TextField,
} from '@/components/ui';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { UpsertAlertSettingsDto } from '@/dto/alertSettings.dto';
import { upsertAlertSettingsSchema } from '@/schemas/alertSettings/upsertAlertSettings.schema';
import { AlertSettings } from '@/types/notificationChannel/alertSettings.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { GLOBAL_ALERT_SETTINGS_FIELDS } from './globalAlertSettingsFields';

interface GlobalAlertSettingsEditProps {
	data: AlertSettings;
}

export const GlobalAlertSettingsEdit = ({
	data,
}: GlobalAlertSettingsEditProps) => {
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
			<ModalTrigger>
				<Button variant="outlined" disabled={isPending}>
					Edit
				</Button>
			</ModalTrigger>
			<ModalContent>
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
								<ModalHeader>Edit Global Alert Settings</ModalHeader>
								<ModalBody>
									{GLOBAL_ALERT_SETTINGS_FIELDS.map((f) => (
										<FormField
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
										</FormField>
									))}
								</ModalBody>
								<ModalFooter>
									<FormActions justifyContent="flex-end">
										<ModalClose>
											<FormReset buttonProps={{ variant: 'outlined' }}>
												Cancel
											</FormReset>
										</ModalClose>
										<FormSubmit disabledOnEmpty>Save</FormSubmit>
									</FormActions>
								</ModalFooter>
							</>
						);
					}}
				</Form>
			</ModalContent>
		</Modal>
	);
};
