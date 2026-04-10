import { MONITOR_STATUSES } from '@/constants';
import { PingResult } from '@/types';
import { useEffect, useState } from 'react';

export const useCalculateUptime = (pingResults: PingResult[]) => {
	const [uptime, setUptime] = useState<string>('N/A');

	useEffect(() => {
		const totalPings = pingResults.length;
		if (totalPings === 0) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setUptime('N/A');
			return;
		}

		const successfulPings = pingResults.filter(
			(ping) => ping.status === MONITOR_STATUSES.UP,
		).length;
		const calculatedUptime = (successfulPings / totalPings) * 100;
		setUptime(calculatedUptime.toFixed(2) + '%');
	}, [pingResults]);

	return { uptime };
};
