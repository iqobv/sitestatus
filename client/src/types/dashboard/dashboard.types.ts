import { Incident } from '../incident';
import { BaseMonitor } from '../monitors';
import { Project } from '../project';
import { StatusPage } from '../statusPage';

export interface DashboardIncident extends Incident {
	monitor: BaseMonitor | null;
}

export interface Dashboard {
	monitors: BaseMonitor[];
	incidents: DashboardIncident[];
	statusPages: StatusPage[];
	projects: Project[];
}
