import { components } from '../schema';

type SwaggerIncidentTimelineType =
	components['schemas']['IncidentTimelineType'];

export const IncidentTimelineType = {
	CREATED: 'CREATED',
	ALERTED: 'ALERTED',
	RESOLVED: 'RESOLVED',
} as const satisfies Record<
	SwaggerIncidentTimelineType,
	SwaggerIncidentTimelineType
>;

export type IncidentTimelineType =
	(typeof IncidentTimelineType)[keyof typeof IncidentTimelineType];
