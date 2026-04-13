'use client';

import { getMonitorAnalytics, getMonitorById } from '@/api';
import { QUERY_KEYS } from '@/config';
import { monitorRangeParser } from '@/parsers';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { parseAsString, useQueryStates } from 'nuqs';
import styles from './Monitor.module.scss';
import MonitorAnalyticsLoader from './MonitorAnalyticsLoader';
import MonitorRangeControl from './MonitorDataDisplayControls/MonitorRangeControl';
import MonitorHeader from './MonitorHeader/MonitorHeader';
import MonitorAccidents from './MonitorIncidents/MonitorIncidents';
import MonitorLoader from './MonitorLoader';
import MonitorOverall from './MonitorOverall/MonitorOverall';
import MonitorRegionControl from './MonitorRegionControl/MonitorRegionControl';
import MonitorRegionStats from './MonitorRegionStats/MonitorRegionStats';
import MonitorResponseCards from './MonitorResponseCards/MonitorResponseCards';
import MonitorResponseChart from './MonitorResponseChart/MonitorResponseChart';

interface MonitorProps {
	id: string;
}

const Monitor = ({ id }: MonitorProps) => {
	const [{ range, region }] = useQueryStates({
		range: monitorRangeParser.withDefault(1),
		region: parseAsString.withDefault('global'),
	});

	const { data: monitor, isLoading } = useQuery({
		queryKey: QUERY_KEYS.monitors.byId(id),
		queryFn: () => getMonitorById(id),
		placeholderData: keepPreviousData,
	});

	const { data: monitorAnalytics, isLoading: isMonitorAnalyticsLoading } =
		useQuery({
			queryKey: QUERY_KEYS.monitors.analtics(id, range, region),
			queryFn: () => getMonitorAnalytics(id, range, region),
			placeholderData: keepPreviousData,
		});

	return (
		<div className={styles['monitor']}>
			{isLoading && <MonitorLoader />}
			{!isLoading && monitor && (
				<div className={`${styles['monitor__content']} fade`}>
					<MonitorHeader monitor={monitor} />
					<MonitorRangeControl monitorId={monitor.id} />
					<MonitorOverall monitor={monitor} />
					<MonitorRegionControl
						regions={monitor.regions}
						isLoading={isMonitorAnalyticsLoading}
					/>
					{isMonitorAnalyticsLoading && <MonitorAnalyticsLoader />}
					{!isMonitorAnalyticsLoading && monitorAnalytics && (
						<>
							<MonitorRegionStats data={monitorAnalytics} />
							<MonitorResponseChart monitor={monitorAnalytics} />
							<MonitorResponseCards
								responseStatistics={monitorAnalytics.statistics.responseTime}
							/>
							<MonitorAccidents incidents={monitorAnalytics.incidents} />
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default Monitor;
