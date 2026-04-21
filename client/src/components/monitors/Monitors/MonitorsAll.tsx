'use client';

import { getAllMonitors } from '@/api';
import { QUERY_KEYS } from '@/config';
import { keepPreviousData } from '@tanstack/react-query';
import Monitors from './Monitors';

const MonitorsAll = () => {
	return (
		<Monitors
			queryKey={QUERY_KEYS.monitors.list}
			queryFn={() => getAllMonitors()}
			placeholderData={keepPreviousData}
		/>
	);
};

export default MonitorsAll;
