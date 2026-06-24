'use client';

import { getAllNotifications } from '@/api/notification/getAllNotifications.api';
import { markAllNotificationAsRead } from '@/api/notification/markAllNotificationAsRead.api';
import {
	Button,
	Dropdown,
	DropdownMenu,
	DropdownTrigger,
} from '@/components/ui';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MdNotificationsNone } from 'react-icons/md';
import styles from './NotificationList.module.scss';
import { NotificationListItem } from './NotificationListItem/NotificationListItem';
import { NotificationListLoader } from './NotificationListLoader';

export const NotificationList = () => {
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.notifications.lists(),
		queryFn: getAllNotifications,
	});

	const { mutate: markAllAsRead } = useMutation({
		mutationFn: markAllNotificationAsRead,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.notifications.lists(),
			});
		},
	});

	const handleOnClose = () => {
		if (data && data.hasUnread) {
			markAllAsRead();
		}
	};

	const hasUnread = data?.hasUnread;

	return (
		<Dropdown onClose={handleOnClose}>
			<DropdownTrigger>
				<Button
					variant="outlined"
					isIcon
					className={hasUnread ? styles.unread : ''}
				>
					<MdNotificationsNone size={20} />
				</Button>
			</DropdownTrigger>
			<DropdownMenu>
				<div className={styles.list}>
					{isLoading && <NotificationListLoader />}
					{data?.notifications.length === 0 && (
						<p className={styles.noData}>No notifications available</p>
					)}
					{data &&
						data.notifications.map((notification) => (
							<NotificationListItem
								key={notification.id}
								notification={notification}
							/>
						))}
				</div>
			</DropdownMenu>
		</Dropdown>
	);
};
