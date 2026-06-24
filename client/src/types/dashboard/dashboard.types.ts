import { Incident } from '../incident/incident.types';
import { BaseMonitor } from '../monitors/monitor.types';
import { Project } from '../project/project.types';
import { StatusPage } from '../statusPage/statusPage.types';

export interface DashboardIncident extends Incident {
	monitor: BaseMonitor | null;
}

export interface Dashboard {
	monitors: BaseMonitor[];
	incidents: DashboardIncident[];
	statusPages: StatusPage[];
	projects: Project[];
}
