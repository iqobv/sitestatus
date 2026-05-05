'use client';

import SettingsCard from '@/components/settings/SettingsCard/SettingsCard';
import { TextField } from '@/components/ui';
import { ChannelStatus, NotificationChannel } from '@/types';
import { capitalize } from '@/utils';
import styles from './NotificationChannelsItem.module.scss';
import NotificationChannelsItemDelete from './NotificationChannelsItemDelete';
import NotificationChannelsItemEdit from './NotificationChannelsItemEdit';
import NotificationChannelsItemResend from './NotificationChannelsItemResend';
import { NOTIFICATION_CHANNEL_ITEM_LABELS } from './notificationChannelsItemTypes';

interface NotificationChannelsItemProps {
	channel: NotificationChannel;
}

const NotificationChannelsItem = ({
	channel,
}: NotificationChannelsItemProps) => {
	const channelTypeLabels = NOTIFICATION_CHANNEL_ITEM_LABELS[channel.type];
	const Icon = channelTypeLabels.icon;

	const tags = [
		channel.isPrimary && 'Primary',
		channel.status === ChannelStatus.PENDING && 'Waiting for verification',
		!channel.isActive && channel.status !== ChannelStatus.PENDING && 'Inactive',
	]
		.filter(Boolean)
		.map((tag, index) => (
			<span key={index} className={styles.tag}>
				({tag})
			</span>
		));

	return (
		<SettingsCard
			title={
				<div className={styles.header}>
					<Icon /> <span>{capitalize(channel.type)}</span>
					{tags.length > 0 && <div className={styles.tags}>{tags}</div>}
				</div>
			}
			description={
				<div className={styles.channel}>
					<TextField
						label={channelTypeLabels.nameLabel}
						value={channel.name}
						readOnly
					/>
					<TextField
						label={channelTypeLabels.valueLabel}
						value={channel.value}
						readOnly
					/>
				</div>
			}
			action={
				<>
					{channel.isActive && (
						<>
							{!channel.isPrimary && (
								<NotificationChannelsItemDelete id={channel.id} />
							)}
							<NotificationChannelsItemEdit channel={channel} />
						</>
					)}
					{channel.status === ChannelStatus.PENDING && (
						<NotificationChannelsItemResend id={channel.id} />
					)}
				</>
			}
			desktopDirection="column"
			actionJustify="flex-end"
		/>
	);
};

export default NotificationChannelsItem;
