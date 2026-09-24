'use client';

import { Button, DropdownItem } from '@/components/ui';
import { Notification } from '@/types/notification/notification.types';
import clsx from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import styles from './NotificationListItem.module.scss';

dayjs.extend(relativeTime);

interface NotificationListItemProps {
	notification: Notification;
}

export const NotificationListItem = ({
	notification,
}: NotificationListItemProps) => {
	const timeAgo = dayjs(notification.createdAt).fromNow();

	return (
		<div className={clsx(styles.item, !notification.isRead && styles.unread)}>
			<div className={styles.content}>
				<p className={styles.title}>{notification.title}</p>
				<p className={styles.message}>{notification.message}</p>
			</div>
			{notification.actionUrl && (
				<DropdownItem
					asChild
					style={{
						justifyContent: 'center',
						textAlign: 'center',
					}}
				>
					<Button fullWidth variant="outlined" asChild textAlign="center">
						<Link href={notification.actionUrl}>View</Link>
					</Button>
				</DropdownItem>
			)}
			<p className={styles.timeAgo}>{timeAgo}</p>
		</div>
	);
};
