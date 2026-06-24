'use client';

import { getAllMonitors } from '@/api';
import { QUERY_KEYS } from '@/config';
import { Monitors } from './Monitors';

export const MonitorsAll = () => {
	return (
		<Monitors
			queryKeyBase={QUERY_KEYS.monitors.lists()}
			queryKeyFactory={(params) => QUERY_KEYS.monitors.list(params)}
			fetcher={getAllMonitors}
		/>
	);
};
