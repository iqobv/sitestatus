import { MonitorsTableLoader } from '@/components/monitors/Monitors/MonitorsTable/MonitorsTableLoader';
import { ProjectHeaderLoader } from '../ProjectHeader/ProjectHeaderLoader';

export const ProjectLoader = () => (
	<>
		<ProjectHeaderLoader />
		<MonitorsTableLoader />
	</>
);
