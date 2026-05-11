export const ChannelStatus = {
	PENDING: 'PENDING',
	VERIFIED: 'VERIFIED',
} as const;

export type ChannelStatus = (typeof ChannelStatus)[keyof typeof ChannelStatus];

export const ChannelType = {
	EMAIL: 'EMAIL',
} as const;

export type ChannelType = (typeof ChannelType)[keyof typeof ChannelType];
