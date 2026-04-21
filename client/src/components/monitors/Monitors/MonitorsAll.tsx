'use client';

import { getAllMonitors } from '@/api';
import { QUERY_KEYS } from '@/config';
import Monitors from './Monitors';

const MonitorsAll = () => {
	return (
		<Monitors
			queryKey={QUERY_KEYS.monitors.list}
			queryFn={() => getAllMonitors()}
		/>
	);
};

export default MonitorsAll;
