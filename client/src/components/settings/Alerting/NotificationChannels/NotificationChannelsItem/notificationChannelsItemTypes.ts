import { ChannelType } from '@/types';
import { IconType } from 'react-icons';
import { MdOutlineEmail } from 'react-icons/md';

interface NotificationChannelsItemLabel {
	nameLabel: string;
	namePlaceholder: string;
	valueLabel: string;
	valuePlaceholder: string;
	icon: IconType;
}

export const NOTIFICATION_CHANNEL_ITEM_LABELS: Record<
	ChannelType,
	NotificationChannelsItemLabel
> = {
	EMAIL: {
		nameLabel: 'Channel name',
		namePlaceholder: 'e.g. My email channel',
		valueLabel: 'Email address',
		valuePlaceholder: 'e.g. user@example.com',
		icon: MdOutlineEmail,
	},
};
