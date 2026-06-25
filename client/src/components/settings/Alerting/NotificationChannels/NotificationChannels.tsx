'use client';

import { getAllNotificationChannels } from '@/api/notificationChannel/getAllNotificationChannel.api';
import { SectionHeader } from '@/components/ui';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useQuery } from '@tanstack/react-query';
import { CreateNotificationChannel } from '../CreateNotificationChannel';
import styles from './NotificationChannels.module.scss';
import { NotificationChannelsItem } from './NotificationChannelsItem/NotificationChannelsItem';
import { NotificationChannelsLoader } from './NotificationChannelsLoader';

export const NotificationChannels = () => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.notificationChannels.lists(),
		queryFn: getAllNotificationChannels,
	});

	return (
		<div>
			<SectionHeader
				title="Notification Channels"
				titleProps={{
					variant: 'h3',
				}}
				rightSlot={<CreateNotificationChannel />}
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
