import { AnalyticsRawData, AnalyticsStatData } from '@/types';

export const getP95 = (
	logs: AnalyticsStatData[] | AnalyticsRawData[],
): string => {
	const totalLogs = logs.length;

	const formatP95 = (response: number) => response.toFixed(3) + '%';

	if (totalLogs === 0) return formatP95(0);

	const isRawData = (
		log: AnalyticsStatData | AnalyticsRawData,
	): log is AnalyticsRawData => {
		return !('uptimePercent' in log);
	};

	// const sortedTimes = [...responseTimes].sort((a, b) => a - b);
	// const index = Math.ceil(0.95 * sortedTimes.length) - 1;

	// return sortedTimes[index];
};
