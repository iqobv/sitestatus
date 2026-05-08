import { DefaultFields } from '../defaultFields.types';
import { BaseMonitor } from '../monitors';

export interface Project extends DefaultFields {
	name: string;
	description: string | null;
}

export interface ProjectWithMonitors extends Project {
	monitors: BaseMonitor[];
}
