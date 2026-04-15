import { AnalyticsData } from '@/types';
import { isRawData } from '@/utils';
import { useMemo, useState } from 'react';

interface ChartPoint {
	timestamp: number;
	[regionKey: string]: number;
}

export const useMonitorResponseChart = (logs: AnalyticsData[]) => {
	const [hiddenRegions, setHiddenRegions] = useState<string[]>([]);

	const dtf = new Intl.DateTimeFormat(undefined, {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: 'numeric',
		minute: '2-digit',
	});

	const { chartData, regions } = useMemo(() => {
		if (!logs || logs.length === 0) {
			return { chartData: [], regions: [] };
		}

		const regionsMap = new Map<string, string>();
		const groupedData = new Map<number, ChartPoint>();

		logs.forEach((log) => {
			const regionKey = log.region.key;
			const regionName = log.region.name;

			if (!regionsMap.has(regionKey)) {
				regionsMap.set(regionKey, regionName);
			}

			const dateString = isRawData(log) ? log.createdAt : log.timestamp;
			const date = new Date(dateString);

			date.setSeconds(0, 0);
			const bucketTimestamp = date.getTime();

			const value = isRawData(log) ? log.responseTimeMs : log.avgResponseMs;

			if (!groupedData.has(bucketTimestamp)) {
				groupedData.set(bucketTimestamp, { timestamp: bucketTimestamp });
			}

			const point = groupedData.get(bucketTimestamp)!;
			point[regionKey] = value;
		});

		const formattedData = Array.from(groupedData.values()).sort(
			(a, b) => a.timestamp - b.timestamp,
		);

		const uniqueRegions = Array.from(regionsMap.entries()).map(
			([key, name]) => ({
				key,
				name,
			}),
		);

		return { chartData: formattedData, regions: uniqueRegions };
	}, [logs]);

	const toggleRegion = (regionKey: string) => {
		if (regions.length <= 1) {
			return;
		}

		setHiddenRegions((prev) => {
			const isHidden = prev.includes(regionKey);

			if (isHidden) {
				return prev.filter((key) => key !== regionKey);
			}

			if (prev.length + 1 >= regions.length) {
				return prev;
			}

			return [...prev, regionKey];
		});
	};

	return {
		chartData,
		regions,
		dtf,
		toggleRegion,
		hiddenRegions,
	};
};
