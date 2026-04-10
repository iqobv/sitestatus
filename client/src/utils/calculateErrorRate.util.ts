import { AnalyticsRawData, AnalyticsStatData } from '@/types';

export const calculateErrorRate = (
	logs: AnalyticsStatData[] | AnalyticsRawData[],
) => {
	const totalLogs = logs.length;

	const formatRate = (rate: number) => rate.toFixed(3) + '%';

	if (totalLogs === 0) return formatRate(0);

	const countDown = logs.filter((log) => log.status === 'DOWN').length;

	return formatRate((countDown / totalLogs) * 100);
};
