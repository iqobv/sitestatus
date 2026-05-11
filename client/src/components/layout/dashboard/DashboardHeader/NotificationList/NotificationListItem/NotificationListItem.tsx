'use client';

import { Button } from '@/components/ui';
import { Notification } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styles from './NotificationListItem.module.scss';

dayjs.extend(relativeTime);

interface NotificationListItemProps {
	notification: Notification;
}

const NotificationListItem = ({ notification }: NotificationListItemProps) => {
	const classNames = [styles.item, !notification.isRead && styles.unread]
		.filter(Boolean)
		.join(' ');

	const timeAgo = dayjs(notification.createdAt).fromNow();

	return (
		<div className={classNames}>
			<div className={styles.content}>
				<p className={styles.title}>{notification.title}</p>
				<p className={styles.message}>{notification.message}</p>
			</div>
			{notification.actionUrl && (
				<Button href={notification.actionUrl} fullWidth variant="outlined">
					View
				</Button>
			)}
			<p className={styles.timeAgo}>{timeAgo}</p>
		</div>
	);
};

export default NotificationListItem;
