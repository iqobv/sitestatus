import { Incident } from '../incident';
import { AnalyticsRawData } from './analyticsRawData.types';
import { AnalyticsStatData } from './analyticsStatData.types';
import { MonitorStatistics } from './monitorStatistics.types';
import { AnalyticsStatPeriod } from './statPeriod.types';

export type AnalyticsData = AnalyticsRawData | AnalyticsStatData;

export interface MonitorAnalytics {
	period: AnalyticsStatPeriod;
	statistics: MonitorStatistics;
	incidents: Incident[];
	data: AnalyticsData[];
}
