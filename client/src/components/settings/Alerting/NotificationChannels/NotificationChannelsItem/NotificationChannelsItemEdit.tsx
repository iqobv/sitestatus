import { updateNotificationChannel } from '@/api/notificationChannel/updateNotificationChannel.api';
import {
	Button,
	Checkbox,
	Form,
	FormActions,
	FormField,
	FormLabel,
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
import { UpdateNotificationChannelDto } from '@/dto/notificationChannel.dto';
import { updateNotificationChannelSchema } from '@/schemas/notificationChannel/updateNotificationChannel.types';
import { NotificationChannel } from '@/types/notificationChannel/notificationChannel.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { NOTIFICATION_CHANNEL_ITEM_LABELS } from './notificationChannelsItemTypes';

interface NotificationChannelsItemEditProps {
	channel: NotificationChannel;
}

export const NotificationChannelsItemEdit = ({
	channel,
}: NotificationChannelsItemEditProps) => {
	const channelTypeLabels = NOTIFICATION_CHANNEL_ITEM_LABELS[channel.type];

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: (dto: UpdateNotificationChannelDto) =>
			updateNotificationChannel(channel.id, dto),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.notificationChannels.lists(),
			});
		},
		onError: (e) => {
			toast.error(e.message || 'Failed to update notification channel');
		},
	});

	return (
		<Modal>
			<ModalTrigger>
				<Button variant="outlined">Edit</Button>
			</ModalTrigger>
			<ModalContent>
				<Form<UpdateNotificationChannelDto>
					schema={updateNotificationChannelSchema}
					defaultValues={{
						name: channel.name,
						isActive: channel.isActive,
						isPrimary: channel.isPrimary,
					}}
					onSubmit={(data) => {
						mutate(data);
					}}
				>
					<ModalHeader>Edit Notification Channel: {channel.name}</ModalHeader>
					<ModalBody>
						<FormField name="name">
							<FormLabel>{channelTypeLabels.nameLabel}</FormLabel>
							<TextField placeholder={channelTypeLabels.namePlaceholder} />
						</FormField>
						<FormField name="isActive">
							<Checkbox label="Is Active" />
						</FormField>
						<FormField name="isPrimary">
							<Checkbox label="Is Primary" />
						</FormField>
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
				</Form>
			</ModalContent>
		</Modal>
	);
};
