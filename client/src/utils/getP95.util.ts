export const getP95 = (responseTimes: number[]): number => {
	if (responseTimes.length === 0) return 0;

	const sortedTimes = [...responseTimes].sort((a, b) => a - b);
	const index = Math.ceil(0.95 * sortedTimes.length) - 1;

	return sortedTimes[index];
};
