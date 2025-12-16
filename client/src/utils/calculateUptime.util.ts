import { IPingResult } from '@/types';

export const calculateUptime = (pingResults: IPingResult[]): string => {
	const totalPings = pingResults.length;

	if (totalPings === 0) {
		return 'N/A';
	}

	const successfulPings = pingResults.filter(
		(ping) => ping.status === 'UP'
	).length;

	const calculatedUptime = (successfulPings / totalPings) * 100;
	return calculatedUptime.toFixed(2) + '%';
};
