import { app, InvocationContext } from '@azure/functions';
import { ServiceBusClient, ServiceBusSender } from '@azure/service-bus';
import { getConfig } from '../config/env.js';
import { MonitorTask } from '../types/monitor-task.types.js';
import { PingResultPayload } from '../types/ping-result-payload.types.js';

const config = getConfig();

const sbClient = new ServiceBusClient(config.serviceBusConnectionString);
const resultSender: ServiceBusSender = sbClient.createSender('monitor-results');

export async function processPingTask(
	message: unknown,
	context: InvocationContext,
): Promise<void> {
	const payload = message as MonitorTask;
	const { region } = config;
	const startTime = Date.now();

	try {
		const response = await fetch(payload.url, { method: payload.method });
		const duration = Date.now() - startTime;

		const result: PingResultPayload = {
			monitorId: payload.monitorId,
			status: response.ok ? 'UP' : 'DOWN',
			errorMessage: response.statusText === 'OK' ? null : response.statusText,
			responseTimeMs: duration,
			statusCode: response.status,
			region,
		};

		await resultSender.sendMessages({
			body: result,
			contentType: 'application/json',
		});
	} catch (error: unknown) {
		const duration = Date.now() - startTime;
		let errorMessage = 'Unknown error';

		if (error instanceof Error) {
			errorMessage = error.message;
		}

		const result: PingResultPayload = {
			monitorId: payload.monitorId,
			status: 'DOWN',
			responseTimeMs: duration,
			errorMessage,
			statusCode: 0,
			region,
		};

		await resultSender.sendMessages({
			body: result,
			contentType: 'application/json',
		});
	}
}

app.serviceBusQueue('pingWorkerTrigger', {
	connection: 'SERVICE_BUS_CONNECTION_STRING',
	queueName: config.queueName,
	handler: processPingTask,
});
