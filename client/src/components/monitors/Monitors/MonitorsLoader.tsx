import { MonitorRefreshLoader } from './MonitorRefresh/MonitorRefreshLoader';
import { MonitorsTableLoader } from './MonitorsTable/MonitorsTableLoader';

export const MonitorsLoader = () => (
	<>
		<MonitorRefreshLoader />
		<MonitorsTableLoader />
	</>
);
