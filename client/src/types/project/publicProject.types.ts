import { MonitorWithTimeline } from '../monitors';
import { Project } from './project.types';

export interface PublicProjectPage extends Project {
	monitors: MonitorWithTimeline[];
}
