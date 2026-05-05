import { updateNotificationChannel } from '@/api';
import { Button, Checkbox, Form, Modal, TextField } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { UpdateNotificationChannelDto } from '@/dto';
import { updateNotificationChannelSchema } from '@/schemas';
import { NotificationChannel } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import styles from './NotificationChannelsItem.module.scss';
import { NOTIFICATION_CHANNEL_ITEM_LABELS } from './notificationChannelsItemTypes';

interface NotificationChannelsItemEditProps {
	channel: NotificationChannel;
}

const NotificationChannelsItemEdit = ({
	channel,
}: NotificationChannelsItemEditProps) => {
	const channelTypeLabels = NOTIFICATION_CHANNEL_ITEM_LABELS[channel.type];

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: (dto: UpdateNotificationChannelDto) =>
			updateNotificationChannel(channel.id, dto),
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: QUERY_KEYS.notificationChannel.all,
			});
		},
		onError: (e) => {
			toast.error(e.message || 'Failed to update notification channel');
		},
	});

	return (
		<Modal>
			<Modal.Trigger>
				<Button variant="outlined">Edit</Button>
			</Modal.Trigger>
			<Modal.Content>
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
					<Modal.Header>Edit Notification Channel: {channel.name}</Modal.Header>
					<Modal.Body>
						<Form.Field name="name">
							<Form.Label>{channelTypeLabels.nameLabel}</Form.Label>
							<TextField placeholder={channelTypeLabels.namePlaceholder} />
						</Form.Field>
						<Form.Field name="isActive">
							<Checkbox label="Is Active" />
						</Form.Field>
						<Form.Field name="isPrimary">
							<Checkbox label="Is Primary" />
						</Form.Field>
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
				</Form>
			</Modal.Content>
		</Modal>
	);
};

export default NotificationChannelsItemEdit;
