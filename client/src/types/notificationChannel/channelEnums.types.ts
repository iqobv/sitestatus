import { components } from '../schema';

type SwaggerStatus = components['schemas']['ChannelStatus'];
type SwaggerType = components['schemas']['ChannelType'];

export const ChannelStatus = {
	PENDING: 'PENDING',
	VERIFIED: 'VERIFIED',
} as const satisfies Record<SwaggerStatus, SwaggerStatus>;

export type ChannelStatus = (typeof ChannelStatus)[keyof typeof ChannelStatus];

export const ChannelType = {
	EMAIL: 'EMAIL',
} as const satisfies Record<SwaggerType, SwaggerType>;

export type ChannelType = (typeof ChannelType)[keyof typeof ChannelType];
