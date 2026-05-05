'use client';

import { getAllNotificationChannels } from '@/api';
import { SectionHeader } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import CreateNotificationChannel from '../CreateNotificationChannel';
import styles from './NotificationChannels.module.scss';
import NotificationChannelsItem from './NotificationChannelsItem/NotificationChannelsItem';
import NotificationChannelsLoader from './NotificationChannelsLoader';

const NotificationChannels = () => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.notificationChannel.all,
		queryFn: getAllNotificationChannels,
	});

	return (
		<div>
			<SectionHeader
				title={
					<div className={styles.header}>
						<span>Notification Channels</span>
						<CreateNotificationChannel />
					</div>
				}
				titleComponent="h3"
			/>
			{isLoading && <NotificationChannelsLoader />}
			{data && data.length > 0 && (
				<div className={styles.list}>
					{data.map((c) => (
						<NotificationChannelsItem key={c.id} channel={c} />
					))}
				</div>
			)}
		</div>
	);
};

export default NotificationChannels;
