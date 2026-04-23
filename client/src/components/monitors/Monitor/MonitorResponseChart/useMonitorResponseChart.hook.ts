'use client';

import { getAllRegions } from '@/api';
import { QUERY_KEYS } from '@/config';
import { AnalyticsData } from '@/types';
import { isRawData } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

interface ChartPoint {
	timestamp: number;
	[regionKey: string]: number;
}

export const useMonitorResponseChart = (logs: AnalyticsData[]) => {
	const [hiddenRegions, setHiddenRegions] = useState<string[]>([]);

	const { data: regionData } = useQuery({
		queryKey: QUERY_KEYS.region.list,
		queryFn: getAllRegions,
	});

	const dtf = new Intl.DateTimeFormat(undefined, {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: 'numeric',
		minute: '2-digit',
	});

	const { chartData, regions } = useMemo(() => {
		if (!logs || logs.length === 0 || !regionData) {
			return { chartData: [], regions: [] };
		}

		const uniqueRegions = new Set<string>();
		const groupedData = new Map<number, ChartPoint>();

		logs.forEach((log) => {
			uniqueRegions.add(log.regionId);

			const dateString = isRawData(log) ? log.createdAt : log.timestamp;
			const date = new Date(dateString);

			date.setSeconds(0, 0);
			const bucketTimestamp = date.getTime();

			const value = isRawData(log) ? log.responseTimeMs : log.avgResponseMs;

			if (!groupedData.has(bucketTimestamp)) {
				groupedData.set(bucketTimestamp, { timestamp: bucketTimestamp });
			}

			const point = groupedData.get(bucketTimestamp)!;
			point[log.regionId] = value;
		});

		const formattedData = Array.from(groupedData.values()).sort(
			(a, b) => a.timestamp - b.timestamp,
		);

		const mappedRegions = Array.from(uniqueRegions).map((id) => {
			const region = regionData?.find((r) => r.id === id);

			return {
				id: region?.id || id,
				key: region?.key || id,
				name: region?.name || id,
			};
		});

		return { chartData: formattedData, regions: mappedRegions };
	}, [logs, regionData]);

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
