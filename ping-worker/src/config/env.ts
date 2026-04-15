export interface Config {
	apiUrl: string;
	workerSecret: string;
	region: string;
	serviceBusConnectionString: string;
	queueName: string;
}

export const getConfig = (): Config => {
	const {
		MAIN_API_URL,
		WORKER_SECRET_KEY,
		WORKER_REGION,
		SERVICE_BUS_CONNECTION_STRING,
	} = process.env;

	if (
		!MAIN_API_URL ||
		!WORKER_SECRET_KEY ||
		!WORKER_REGION ||
		!SERVICE_BUS_CONNECTION_STRING
	) {
		throw new Error(
			'Missing required environment variables: MAIN_API_URL, WORKER_SECRET_KEY, WORKER_REGION, or SERVICE_BUS_CONNECTION_STRING',
		);
	}

	return {
		apiUrl: MAIN_API_URL,
		workerSecret: WORKER_SECRET_KEY,
		region: WORKER_REGION,
		serviceBusConnectionString: SERVICE_BUS_CONNECTION_STRING,
		queueName: `tasks-${WORKER_REGION}`,
	};
};
