import { getIncidentDetails } from '@/api/incident/incidentDetails.api';
import { components } from '../schema';

export type Incident = components['schemas']['IncidentDto'];
export type IncidentDetails = Awaited<ReturnType<typeof getIncidentDetails>>;
