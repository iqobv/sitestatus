import { AnalyticsRawDataDto } from '@api/public/analytics/dto/analytics-raw-log.dto';
import { AnalyticsStatLogDto } from '@api/public/analytics/dto/analytics-stat-log.dto';
import { CalculateLog, CalculateLogs } from '@libs/types/calculate-logs.types';
import { formatResult } from './format-result.util';

export const calculateUptime = (logs: CalculateLogs): string => {
	const totalLogs = logs.length;

	if (totalLogs === 0) {
		return 'N/A';
	}

	const isRawData = (log: CalculateLog): log is AnalyticsRawDataDto => {
		return !('uptimePercent' in log);
	};

	if (isRawData(logs[0])) {
		const rawLogs = logs as AnalyticsRawDataDto[];
		const upCount = rawLogs.filter((log) => log.status === 'UP').length;
		const uptime = (upCount / totalLogs) * 100;

		return formatResult(uptime);
	}

	const statLogs = logs as AnalyticsStatLogDto[];
	const totalUptime = statLogs.reduce((acc, log) => acc + log.uptimePercent, 0);
	const avgUptime = totalUptime / totalLogs;

	return formatResult(avgUptime);
};
