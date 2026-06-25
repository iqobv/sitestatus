import { deleteNotificationChannel } from '@/api/notificationChannel/deleteNotificationChannel.api';
import { Button, ConfirmAction } from '@/components/ui';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface NotificationChannelsItemDeleteProps {
	id: string;
}

export const NotificationChannelsItemDelete = ({
	id,
}: NotificationChannelsItemDeleteProps) => {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () => deleteNotificationChannel(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.notificationChannels.lists(),
			});
		},
		onError: (e) => {
			toast.error(e.message || 'Failed to delete notification channel');
		},
	});

	return (
		<ConfirmAction
			title="Delete Notification Channel"
			description="Are you sure you want to delete this notification channel?"
			trigger={<Button variant="danger">Delete</Button>}
			onConfirm={() => mutate()}
		/>
	);
};
