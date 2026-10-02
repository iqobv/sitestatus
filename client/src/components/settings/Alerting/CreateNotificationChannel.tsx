'use client';

import { createNotificationChannel } from '@/api/notificationChannel/createNotificationChannel.api';
import {
	Button,
	Form,
	FormActions,
	FormField,
	FormReset,
	FormSelect,
	FormSubmit,
	Modal,
	ModalBody,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalTrigger,
	SelectItem,
	TextField,
} from '@/components/ui';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { CreateNotificationChannelDto } from '@/dto/notificationChannel.dto';
import { createNotificationChannelSchema } from '@/schemas/notificationChannel/createNotificationChannel.schema';
import { ChannelType } from '@/types/notificationChannel/channelEnums.types';
import { capitalize } from '@/utils/capitalize.util';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
			<ModalTrigger asChild>
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
					{({ watch }) => {
						const selectedType = watch('type');
						const channelTypeLabels =
							NOTIFICATION_CHANNEL_ITEM_LABELS[selectedType];

						return (
							<>
								<ModalHeader>Create Notification Channel</ModalHeader>
								<ModalBody>
									<FormSelect<CreateNotificationChannelDto>
										name="type"
										width="trigger"
										zIndex={1050}
										placeholder="Select a type"
									>
										{Object.entries<ChannelType>(ChannelType)
											.map(([key, val]) => ({
												value: val,
												label: capitalize(key),
											}))
											.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
									</FormSelect>
									{selectedType && (
										<>
											<FormField<CreateNotificationChannelDto>
												name="name"
												label={channelTypeLabels.nameLabel}
											>
												<TextField
													placeholder={channelTypeLabels.namePlaceholder}
												/>
											</FormField>
											<FormField<CreateNotificationChannelDto>
												name="value"
												label={channelTypeLabels.valueLabel}
											>
												<TextField
													placeholder={channelTypeLabels.valuePlaceholder}
												/>
											</FormField>
										</>
									)}
								</ModalBody>
								<ModalFooter>
									<FormActions justifyContent="end">
										<ModalClose asChild>
											<FormReset buttonProps={{ variant: 'outlined' }}>
												Cancel
											</FormReset>
										</ModalClose>
										<ModalClose asChild>
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
