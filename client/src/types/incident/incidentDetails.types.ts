import { Incident } from './incident.types';
import { IncidentTimeline } from './incidentTimeline.types';

export interface IncidentDetails extends Incident {
	timeline: IncidentTimeline[];
}
