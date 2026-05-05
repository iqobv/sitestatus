import { DefaultFields } from '../defaultFields.types';
import type { ChannelStatus, ChannelType } from './channelEnums.types';

export interface NotificationChannel extends DefaultFields {
	userId: string;
	name: string;
	type: ChannelType;
	status: ChannelStatus;
	value: string;
	isActive: boolean;
	isPrimary: boolean;
}
