import * as http from 'http';
import * as https from 'https';
import { URL } from 'url';
import { SITE_STATUS } from '../constants/site-status.constants.js';
import { PerformPingPayload } from '../types/perform-ping-payload.types.js';
import { PingResultPayload } from '../types/ping-result-payload.types.js';

type PingResult = Omit<PingResultPayload, 'monitorId' | 'region'>;

const MAX_BODY_SIZE_BYTES = 1024 * 1024;

export const performPing = async (
	payload: PerformPingPayload,
): Promise<PingResult> => {
	const { url: targetUrl, method } = payload;

	return new Promise((resolve) => {
		const startTime = Date.now();
		const url = new URL(targetUrl);
		const client = url.protocol === 'https:' ? https : http;

		const options: https.RequestOptions = {
			method,
			hostname: url.hostname,
			port: url.port || (url.protocol === 'https:' ? 443 : 80),
			path: url.pathname + url.search,
			timeout: 10000,
			headers: {
				Accept:
					'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
				'Accept-Language': 'en-US,en;q=0.9',
				Priority: 'u=0, i',
				'Sec-Ch-Ua':
					'"Chromium";v="152", "Not?A_Brand";v="24", "Google Chrome";v="152"',
				'Sec-Ch-Ua-Mobile': '?0',
				'Sec-Ch-Ua-Platform': '"Linux"',
				'Sec-Fetch-Dest': 'document',
				'Sec-Fetch-Mode': 'navigate',
				'Sec-Fetch-Site': 'none',
				'Sec-Fetch-User': '?1',
				'Upgrade-Insecure-Requests': '1',
				'User-Agent':
					'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',
			},
		};

		const req = client.request(options, (res) => {
			const statusCode = res.statusCode || 500;
			const ok = statusCode >= 200 && statusCode < 400;
			let bytesReceived = 0;

			if (!ok || method === 'HEAD') {
				res.destroy();
				const result = {
					status: ok ? SITE_STATUS.UP : SITE_STATUS.DOWN,
					statusCode,
					responseTimeMs: Date.now() - startTime,
					errorMessage: ok ? null : res.statusMessage || 'Unknown',
				};

				return resolve(result);
			}

			res.on('data', (chunk: Buffer) => {
				bytesReceived += chunk.length;

				if (bytesReceived > MAX_BODY_SIZE_BYTES) res.destroy();
			});

			res.on('end', () => {
				const result = {
					status: SITE_STATUS.UP,
					statusCode,
					responseTimeMs: Date.now() - startTime,
					errorMessage: null,
				};

				resolve(result);
			});
		});

		req.on('timeout', () => {
			req.destroy();
			const result = {
				status: SITE_STATUS.DOWN,
				statusCode: null,
				responseTimeMs: Date.now() - startTime,
				errorMessage: 'Request timeout',
			};

			resolve(result);
		});

		req.on('error', (error: Error) => {
			const result = {
				status: SITE_STATUS.DOWN,
				statusCode: null,
				responseTimeMs: Date.now() - startTime,
				errorMessage: error.message,
			};

			resolve(result);
		});

		req.end();
	});
};
