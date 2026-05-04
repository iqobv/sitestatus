'use client';

import { NotificationChannel } from '@/types';
import NotificationChannelsItem from './NotificationChannelsItem/NotificationChannelsItem';
import styles from './NotificationChannelsList.module.scss';

interface NotificationChannelsListProps {
	data: NotificationChannel[];
}

const NotificationChannelsList = ({ data }: NotificationChannelsListProps) => {
	return (
		<div className={styles.list}>
			{data.map((c) => (
				<NotificationChannelsItem key={c.id} channel={c} />
			))}
		</div>
	);
};

export default NotificationChannelsList;
