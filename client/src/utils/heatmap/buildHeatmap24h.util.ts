import { HeatmapCell, PingResult } from '@/types';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

const MS_IN_MINUTE = 60 * 1000;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const MS_IN_SECOND = 1000;

export const buildHeatmap24h = (
	pings: PingResult[],
	checkIntervalSeconds: number,
	now: Date,
) => {
	if (!checkIntervalSeconds) return [];

	const intervalMs = checkIntervalSeconds * MS_IN_SECOND;
	const fromTime = now.getTime() - 24 * MS_IN_HOUR;
	const slotCount = Math.ceil((24 * MS_IN_HOUR) / intervalMs);

	const buckets: PingResult[][] = Array.from({ length: slotCount }, () => []);

	for (const p of pings) {
		const t = new Date(p.checkedAt).getTime();
		if (t < fromTime || t > now.getTime()) continue;

		const offset = t - fromTime;
		const index = Math.floor(offset / intervalMs);
		if (index < 0 || index >= slotCount) continue;

		buckets[index].push(p);
	}

	const cells: HeatmapCell[] = [];

	for (let i = 0; i < slotCount; i++) {
		const slotStartTime = fromTime + i * intervalMs;
		const slotEndTime = slotStartTime + intervalMs;
		const slot = buckets[i];

		if (!slot.length) {
			cells.push({
				from: new Date(slotStartTime),
				to: new Date(slotEndTime),
				status: null,
				avgResponse: null,
			});
			continue;
		}

		const last = slot[slot.length - 1];

		cells.push({
			from: new Date(slotStartTime),
			to: new Date(slotEndTime),
			status: last.status,
			avgResponse: last.responseTimeMs ?? null,
		});
	}

	return cells;
};
