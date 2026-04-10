import { AnalyticsRawData, AnalyticsStatData } from '@/types';

export const calculateUptime = (
	logs: AnalyticsStatData[] | AnalyticsRawData[],
): string => {
	const totalLogs = logs.length;

	if (totalLogs === 0) {
		return 'N/A';
	}

	const isRawData = (
		log: AnalyticsStatData | AnalyticsRawData,
	): log is AnalyticsRawData => {
		return !('uptimePercent' in log);
	};

	const formatUptime = (uptime: number) => uptime.toFixed(3) + '%';

	if (isRawData(logs[0])) {
		const rawLogs = logs as AnalyticsRawData[];
		const upCount = rawLogs.filter((log) => log.status === 'UP').length;
		const uptime = (upCount / totalLogs) * 100;

		return formatUptime(uptime);
	}

	const statLogs = logs as AnalyticsStatData[];
	const totalUptime = statLogs.reduce((acc, log) => acc + log.uptimePercent, 0);
	const avgUptime = totalUptime / totalLogs;

	return formatUptime(avgUptime);
};
