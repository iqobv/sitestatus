import { SiteStatus } from '@generated/turso/enums';
import { CalculateLogs } from '@libs/types';
import { formatResult } from './format-result.util';

export const calculateErrorRate = (logs: CalculateLogs): string => {
	const totalLogs = logs.length;

	if (totalLogs === 0) return formatResult(0);

	const countDown = logs.filter((log) => log.status === SiteStatus.DOWN).length;
	const errorPercentage = (countDown / totalLogs) * 100;

	return formatResult(errorPercentage);
};
