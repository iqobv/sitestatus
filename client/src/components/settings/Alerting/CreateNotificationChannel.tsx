'use client';

import { createNotificationChannel } from '@/api';
import { Button, Form, Modal, Select, TextField } from '@/components/ui';
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
import { NOTIFICATION_CHANNEL_ITEM_LABELS } from './NotificationChannelsList/NotificationChannelsItem/notificationChannelsItemTypes';

const CreateNotificationChannel = () => {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: (dto: CreateNotificationChannelDto) =>
			createNotificationChannel(dto),
		onSuccess: (data) => {
			queryClient.refetchQueries({
				queryKey: QUERY_KEYS.notificationChannel.all,
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
			<Modal.Trigger>
				<Button className={styles.addButton}>
					<FiPlus size={20} />
					<p className={styles.text}>Add New Channel</p>
				</Button>
			</Modal.Trigger>

			<Modal.Content>
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
								<Modal.Header>Create Notification Channel</Modal.Header>
								<Modal.Body>
									<Form.Field name="type">
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
									</Form.Field>
									{selectedType && (
										<>
											<Form.Field name="name">
												<Form.Label>{channelTypeLabels.nameLabel}</Form.Label>
												<TextField
													placeholder={channelTypeLabels.namePlaceholder}
												/>
											</Form.Field>
											<Form.Field name="value">
												<Form.Label>{channelTypeLabels.valueLabel}</Form.Label>
												<TextField
													placeholder={channelTypeLabels.valuePlaceholder}
												/>
											</Form.Field>
										</>
									)}
								</Modal.Body>
								<Modal.Footer>
									<Form.Actions justifyContent="end">
										<Modal.Close>
											<Button variant="outlined">Cancel</Button>
										</Modal.Close>
										<Modal.Close>
											<Form.Submit disabledOnEmpty disabled={!selectedType}>
												Create
											</Form.Submit>
										</Modal.Close>
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

export default CreateNotificationChannel;
