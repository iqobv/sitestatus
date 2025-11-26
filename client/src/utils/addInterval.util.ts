import type { ManipulateType } from 'dayjs';

export const addInterval = (interval: string) => {
	const match = interval.match(/^(\d+)(h|d|w|m|y)$/);
	if (!match) throw new Error('Invalid interval format');

	const [, num, unit] = match;

	return { num: Number(num), unit: unit as ManipulateType };
};
