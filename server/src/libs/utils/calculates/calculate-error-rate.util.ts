import { SiteStatus } from 'generated/prisma/enums';
import { CalculateLogs } from 'src/libs/types';
import { formatResult } from './format-result.util';

export const calculateErrorRate = (logs: CalculateLogs): string => {
	const totalLogs = logs.length;

	if (totalLogs === 0) return formatResult(0);

	const countDown = logs.filter((log) => log.status === SiteStatus.DOWN).length;
	const errorPercentage = (countDown / totalLogs) * 100;

	return formatResult(errorPercentage);
};
