import { getMonitorById } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { IMonitorWithPingResults, TMonitorRange } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface UseMonitorProps {
	id: string;
	initialData?: IMonitorWithPingResults;
}

export const useMonitor = ({ id, initialData }: UseMonitorProps) => {
	const [monitor, setMonitor] = useState<IMonitorWithPingResults>();
	const [selectedRange, setSelectedRange] = useState<TMonitorRange>('24h');

	const { token, isAuthenticated } = useAuth();

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.monitors.byId(id),
		queryFn: () => getMonitorById(token!, id),
		enabled: !!token && isAuthenticated,
		retry: false,
		initialData,
	});

	useEffect(() => {
		if (!isLoading && data && data.pingResults) {
			const pingResults = data.pingResults.filter((ping) => {
				const pingDate = new Date(ping.checkedAt);
				const now = new Date();
				let rangeStart: Date;

				switch (selectedRange) {
					case '24h':
						rangeStart = new Date(now.getTime() - 24 * 60 * 60 * 1000);
						break;
					case '7d':
						rangeStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
						break;
					case '30d':
						rangeStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
						break;
					default:
						rangeStart = new Date(0);
				}

				return pingDate >= rangeStart && pingDate <= now;
			});

			const updatedMonitor = { ...data, pingResults };

			// eslint-disable-next-line react-hooks/set-state-in-effect
			setMonitor(updatedMonitor ? updatedMonitor : undefined);
		}
	}, [data, isLoading, selectedRange]);

	return {
		isLoading,
		data,
		monitor,
		selectedRange,
		setSelectedRange,
	};
};
