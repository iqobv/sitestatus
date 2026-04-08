import { SITE_STATUS } from '../constants/site-status.constants.js';
import { PingResultPayload } from '../types/ping-result-payload.types.js';

type PingResult = Omit<PingResultPayload, 'monitorId' | 'region'>;

export const performPing = async (url: string): Promise<PingResult> => {
	const startTime = Date.now();
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 10000);

	try {
		const response = await fetch(url, {
			method: 'GET',
			signal: controller.signal,
			headers: { 'User-Agent': 'Azure-Monitor-Worker/1.0' },
		});

		clearTimeout(timeoutId);

		return {
			status: response.ok ? SITE_STATUS.UP : SITE_STATUS.DOWN,
			statusCode: response.status,
			responseTimeMs: Date.now() - startTime,
			errorMessage: null,
		};
	} catch (error: unknown) {
		clearTimeout(timeoutId);
		return {
			status: SITE_STATUS.DOWN,
			statusCode: null,
			responseTimeMs: Date.now() - startTime,
			errorMessage: error instanceof Error ? error.message : String(error),
		};
	}
};
