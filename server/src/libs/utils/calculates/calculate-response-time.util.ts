import {
	AnalyticsRawDataDto,
	AnalyticsStatisticsResponseDto,
	AnalyticsStatLogDto,
} from '@api/public/analytics/dto';
import { CalculateLog, CalculateLogs } from '@libs/types';

export const calculateResponseTime = (
	logs: CalculateLogs,
): AnalyticsStatisticsResponseDto => {
	const totalLogs = logs.length;

	if (totalLogs === 0) {
		return { min: 0, max: 0, avg: 0 };
	}

	const isRawData = (log: CalculateLog): log is AnalyticsRawDataDto => {
		return !('avgResponseMs' in log);
	};

	let responseTimes: number[];

	if (isRawData(logs[0])) {
		const rawLogs = logs as AnalyticsRawDataDto[];
		responseTimes = rawLogs.map((log) => log.responseTimeMs);
	} else {
		const statsLogs = logs as AnalyticsStatLogDto[];
		responseTimes = statsLogs.map((log) => log.avgResponseMs);
	}

	return {
		min: Math.min(...responseTimes),
		max: Math.max(...responseTimes),
		avg: Math.floor(
			responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length,
		),
	};
};
