'use client';

import { getAllNotificationChannels } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import SettingsWrapper from '../SettingsWrapper/SettingsWrapper';
import styles from './Alerting.module.scss';
import CreateNotificationChannel from './CreateNotificationChannel';
import NotificationChannelsList from './NotificationChannelsList/NotificationChannelsList';
import NotificationChannelsListLoader from './NotificationChannelsList/NotificationChannelsListLoader';

const Alerting = () => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.notificationChannel.all,
		queryFn: getAllNotificationChannels,
	});

	return (
		<SettingsWrapper
			title={
				<div className={styles.header}>
					<span>Alerting</span>
					<CreateNotificationChannel />
				</div>
			}
		>
			{isLoading && <NotificationChannelsListLoader />}
			{data && data.length > 0 && <NotificationChannelsList data={data} />}
		</SettingsWrapper>
	);
};

export default Alerting;
