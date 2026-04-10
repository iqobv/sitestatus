'use client';

import { MonitorWithPingResults } from '@/types';
import { useEffect, useState } from 'react';

interface MonitorStatusBreakdownCode {
	code: string;
	percentage: number;
}

export const useMonitorStatusBreakdown = (monitor: MonitorWithPingResults) => {
	const [codes, setCodes] = useState<MonitorStatusBreakdownCode[]>([]);

	useEffect(() => {
		if (!monitor.pingResults) return;

		const totalResults = monitor.pingResults.length;
		const codeCounts: { [key: string]: number } = {};

		monitor.pingResults.forEach((ping) => {
			const code = ping.statusCode || 'unknown';
			codeCounts[code] = (codeCounts[code] || 0) + 1;
		});

		const codePercentages = Object.entries(codeCounts).map(([code, count]) => ({
			code,
			percentage: (count / totalResults) * 100,
		}));

		// eslint-disable-next-line react-hooks/set-state-in-effect
		setCodes(codePercentages);
	}, [monitor]);

	return {
		codes,
	};
};
