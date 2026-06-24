'use client';

import { createNotificationChannel } from '@/api';
import {
	Button,
	Form,
	FormActions,
	FormField,
	FormLabel,
	FormSubmit,
	Modal,
	ModalBody,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalTrigger,
	Select,
	TextField,
} from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { CreateNotificationChannelDto } from '@/dto';
import { createNotificationChannelSchema } from '@/schemas';
import { ChannelType } from '@/types';
import { capitalize } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import styles from './Alerting.module.scss';
import { NOTIFICATION_CHANNEL_ITEM_LABELS } from './NotificationChannels/NotificationChannelsItem/notificationChannelsItemTypes';

export const CreateNotificationChannel = () => {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: (dto: CreateNotificationChannelDto) =>
			createNotificationChannel(dto),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.notificationChannels.lists(),
			});
			toast.success(
				data.message || 'Notification channel created successfully',
			);
		},
		onError: (e) => {
			toast.error(e.message || 'Failed to create notification channel');
		},
	});

	return (
		<Modal>
			<ModalTrigger>
				<Button className={styles.addButton}>
					<FiPlus size={20} />
					<p className={styles.text}>Add New Channel</p>
				</Button>
			</ModalTrigger>
			<ModalContent>
				<Form<CreateNotificationChannelDto>
					schema={createNotificationChannelSchema}
					onSubmit={(data) => mutate(data)}
					defaultValues={{
						name: '',
						type: undefined,
						value: '',
					}}
				>
					{({ control, watch }) => {
						const selectedType = watch('type');
						const channelTypeLabels =
							NOTIFICATION_CHANNEL_ITEM_LABELS[selectedType];

						return (
							<>
								<ModalHeader>Create Notification Channel</ModalHeader>
								<ModalBody>
									<FormField name="type">
										<Controller
											name="type"
											control={control}
											render={({
												field: { value, onChange },
												fieldState: { error },
											}) => (
												<Select
													label="Type"
													options={[
														{ value: '', label: 'Select a type' },
														...Object.entries<ChannelType>(ChannelType).map(
															([key, val]) => ({
																value: val,
																label: capitalize(key),
															}),
														),
													]}
													error={error?.message}
													placeholder="Select a type"
													value={value}
													onChange={onChange}
												/>
											)}
										/>
									</FormField>
									{selectedType && (
										<>
											<FormField name="name">
												<FormLabel>{channelTypeLabels.nameLabel}</FormLabel>
												<TextField
													placeholder={channelTypeLabels.namePlaceholder}
												/>
											</FormField>
											<FormField name="value">
												<FormLabel>{channelTypeLabels.valueLabel}</FormLabel>
												<TextField
													placeholder={channelTypeLabels.valuePlaceholder}
												/>
											</FormField>
										</>
									)}
								</ModalBody>
								<ModalFooter>
									<FormActions justifyContent="end">
										<ModalClose>
											<Button variant="outlined">Cancel</Button>
										</ModalClose>
										<ModalClose>
											<FormSubmit disabledOnEmpty disabled={!selectedType}>
												Create
											</FormSubmit>
										</ModalClose>
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
