import { AnalyticsRawData } from './analyticsRawData.types';
import { AnalyticsStatData } from './analyticsStatData.types';
import { MonitorAccident } from './monitorAccident.types';
import { MonitorStatistics } from './monitorStatistics.types';
import { AnalyticsStatPeriod } from './statPeriod.types';

export interface MonitorAnalytics {
	period: AnalyticsStatPeriod;
	statistics: MonitorStatistics;
	accidents: MonitorAccident[];
	data: AnalyticsRawData[] | AnalyticsStatData[];
}
