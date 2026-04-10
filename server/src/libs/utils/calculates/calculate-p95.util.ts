import {
	AnalyticsRawDataDto,
	AnalyticsStatLogDto,
} from 'src/api/public/analytics/dto';
import { CalculateLog, CalculateLogs } from 'src/libs/types';

export const calculateP95 = (logs: CalculateLogs): number => {
	const totalLogs = logs.length;

	if (totalLogs === 0) return 0;

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

	const sortedResponses = responseTimes.sort((a, b) => a - b);
	const index = Math.ceil(0.95 * sortedResponses.length) - 1;

	return sortedResponses[index];
};
