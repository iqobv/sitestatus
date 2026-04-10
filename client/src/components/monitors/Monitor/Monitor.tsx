'use client';

import { getMonitorAnalytics, getMonitorById } from '@/api';
import { QUERY_KEYS } from '@/config';
import { monitorRangeParser } from '@/parsers';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { parseAsString, useQueryStates } from 'nuqs';
import styles from './Monitor.module.scss';
import MonitorRangeControl from './MonitorDataDisplayControls/MonitorRangeControl';
import MonitorHeader from './MonitorHeader/MonitorHeader';
import MonitorLoader from './MonitorLoader';
import MonitorOverall from './MonitorOverall/MonitorOverall';
import MonitorRegionControl from './MonitorRegionControl/MonitorRegionControl';
import MonitorRegionStats from './MonitorRegionStats/MonitorRegionStats';

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
					<MonitorRegionControl regions={monitor.regions} />
					{isMonitorAnalyticsLoading && <div>Loadiong..</div>}
					{!isMonitorAnalyticsLoading && monitorAnalytics && (
						<MonitorRegionStats data={monitorAnalytics} />
					)}
					{/* <MonitorHeatmap monitor={monitor} selectedRange={selectedRange} /> */}
					{/* <MonitorIncidentList
						monitor={monitor}
						selectedRange={selectedRange}
					/> */}
				</div>
			)}
		</div>
	);
};

export default Monitor;
