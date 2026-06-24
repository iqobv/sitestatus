import { MonitorResponseStatistics } from '@/types/monitors/monitorResponseStatistics.types';
import { MonitorCard } from '@/types/ui/monitorCard.types';

export const MONITOR_RESPONSE_CARDS_ITEMS: MonitorCard<MonitorResponseStatistics>[] =
	[
		{
			title: 'Min Response Time',
			render: (response) => <>{response.min} ms</>,
		},
		{
			title: 'Max Response Time',
			render: (response) => <>{response.max} ms</>,
		},
		{
			title: 'Average Response Time',
			render: (response) => <>{response.avg} ms</>,
		},
	];
