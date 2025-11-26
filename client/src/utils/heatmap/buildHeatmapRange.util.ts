import { IHeatmapCell, IPingResult, TMonitorRange } from '@/types';

const MS_IN_MINUTE = 60 * 1000;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const MS_IN_DAY = 24 * MS_IN_HOUR;

export const buildHeatmapRange = (
	pings: IPingResult[],
	range: TMonitorRange,
	now: Date
) => {
	const numDays = range === '7d' ? 7 : 30;
	const fromTime =
		new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() -
		(numDays - 1) * MS_IN_DAY;

	const groupingSizeDays = range === '7d' ? 1 : 7;
	const totalRows = Math.ceil(numDays / groupingSizeDays);
	const slotsPerRow = 24;
	const totalSlots = totalRows * slotsPerRow;

	const buckets: IPingResult[][] = Array.from({ length: totalSlots }, () => []);

	for (const p of pings) {
		const t = new Date(p.checkedAt).getTime();
		if (t < fromTime || t > now.getTime()) continue;

		const offsetDays = Math.floor((t - fromTime) / MS_IN_DAY);
		if (offsetDays < 0 || offsetDays >= numDays) continue;

		const rowIndex = Math.floor(offsetDays / groupingSizeDays);
		const date = new Date(t);
		const hour = date.getHours();

		const slotIndex = rowIndex * slotsPerRow + hour;
		if (slotIndex < 0 || slotIndex >= totalSlots) continue;

		buckets[slotIndex].push(p);
	}

	const cells: IHeatmapCell[] = [];

	for (let row = 0; row < totalRows; row++) {
		for (let hour = 0; hour < 24; hour++) {
			const index = row * slotsPerRow + hour;
			const slot = buckets[index];

			const rowStartTime = fromTime + row * groupingSizeDays * MS_IN_DAY;
			const slotStartTime = rowStartTime + hour * MS_IN_HOUR;
			const slotEndTime = slotStartTime + MS_IN_HOUR;

			if (!slot.length) {
				cells.push({
					from: new Date(slotStartTime),
					to: new Date(slotEndTime),
					status: null,
					avgResponse: null,
				});
				continue;
			}

			let isDown = false;
			let sum = 0;
			let count = 0;

			for (const s of slot) {
				if (s.status === 'DOWN') isDown = true;
				if (s.responseTimeMs != null) {
					sum += s.responseTimeMs;
					count++;
				}
			}

			const avg = count ? sum / count : null;

			cells.push({
				from: new Date(slotStartTime),
				to: new Date(slotEndTime),
				status: isDown ? 'DOWN' : 'UP',
				avgResponse: avg,
			});
		}
	}

	return cells;
};
