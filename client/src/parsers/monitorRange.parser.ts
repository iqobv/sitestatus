import { RANGE_TO_URL_MAP, URL_TO_RANGE_MAP } from '@/constants';
import { RangeNumericValue } from '@/types';
import { createParser } from 'nuqs';

export const monitorRangeParser = createParser({
	parse: (value: string): RangeNumericValue | null => {
		const parsedValue = URL_TO_RANGE_MAP[value];
		if (parsedValue === 1 || parsedValue === 7 || parsedValue === 30) {
			return parsedValue;
		}
		return null;
	},
	serialize: (value: RangeNumericValue): string => {
		return RANGE_TO_URL_MAP[value] ?? '24h';
	},
});
