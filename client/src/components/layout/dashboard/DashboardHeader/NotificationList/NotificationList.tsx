'use client';

import { getAllNotifications, markAllNotificationAsRead } from '@/api';
import { Button, Dropdown } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MdNotificationsNone } from 'react-icons/md';
import styles from './NotificationList.module.scss';
import { NotificationListItem } from './NotificationListItem';
import NotificationListLoader from './NotificationListLoader';

const NotificationList = () => {
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.notification.all,
		queryFn: getAllNotifications,
	});

	const { mutate: markAllAsRead } = useMutation({
		mutationFn: markAllNotificationAsRead,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notification.all });
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
			<Dropdown.Trigger>
				<Button
					variant="outlined"
					isIcon
					className={hasUnread ? styles.unread : ''}
				>
					<MdNotificationsNone size={20} />
				</Button>
			</Dropdown.Trigger>
			<Dropdown.Menu>
				<div className={styles.list}>
					{isLoading && <NotificationListLoader />}
					{data &&
						data.notifications.map((notification) => (
							<NotificationListItem
								key={notification.id}
								notification={notification}
							/>
						))}
				</div>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default NotificationList;
