export interface Config {
	apiUrl: string;
	workerSecret: string;
	region: string;
}

export const getConfig = (): Config => {
	const { MAIN_API_URL, WORKER_SECRET_KEY, WORKER_REGION } = process.env;

	if (!MAIN_API_URL || !WORKER_SECRET_KEY || !WORKER_REGION) {
		throw new Error(
			'Missing required environment variables: MAIN_API_URL, WORKER_SECRET_KEY, or WORKER_REGION',
		);
	}

	return {
		apiUrl: MAIN_API_URL,
		workerSecret: WORKER_SECRET_KEY,
		region: WORKER_REGION,
	};
};
