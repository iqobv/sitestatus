import { HeatmapCell, MonitorRange, PingResult } from '@/types';
import { buildHeatmap24h } from './buildHeatmap24h.util';
import { buildHeatmapRange } from './buildHeatmapRange.util';

export const buildHeatmapCells = (
	pings: PingResult[],
	range: MonitorRange,
	checkIntervalMinutes: number,
	now: Date = new Date(),
): HeatmapCell[] => {
	if (!pings.length) return [];

	if (range === '24h') {
		return buildHeatmap24h(pings, checkIntervalMinutes, now);
	}

	return buildHeatmapRange(pings, range, now);
};
