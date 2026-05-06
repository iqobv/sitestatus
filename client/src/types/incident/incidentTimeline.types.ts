export const IncidentTimelineType = {
	CREATED: 'CREATED',
	ALERTED: 'ALERTED',
	RESOLVED: 'RESOLVED',
} as const;

export type IncidentTimelineType =
	(typeof IncidentTimelineType)[keyof typeof IncidentTimelineType];

export interface IncidentTimeline {
	type: IncidentTimelineType;
	timestamp: Date;
	metadata: string;
}
