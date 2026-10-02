import { app, InvocationContext } from '@azure/functions';
import { ServiceBusClient, ServiceBusSender } from '@azure/service-bus';
import { z } from 'zod';
import { getConfig } from '../config/env.js';
import { monitorTaskSchema } from '../schemas/monitor-task.schema.js';
import { performPing } from '../services/pinger.service.js';
import { PingResultPayload } from '../types/ping-result-payload.types.js';

const config = getConfig();
const sbClient = new ServiceBusClient(config.serviceBusConnectionString);
const resultSender: ServiceBusSender = sbClient.createSender('monitor-results');

export async function processPingTask(
	message: unknown,
	context: InvocationContext,
): Promise<void> {
	const parsedMessage = monitorTaskSchema.safeParse(message);

	if (!parsedMessage.success) {
		context.error(
			'Invalid message payload received',
			z.treeifyError(parsedMessage.error),
		);
		throw new Error('Message validation failed');
	}

	const { monitorId, url, method } = parsedMessage.data;

	const pingResult = await performPing({ url, method });

	const result: PingResultPayload = {
		monitorId,
		region: config.region,
		status: pingResult.status,
		statusCode: pingResult.statusCode,
		responseTimeMs: pingResult.responseTimeMs,
		errorMessage: pingResult.errorMessage,
	};

	try {
		await resultSender.sendMessages({
			body: result,
			contentType: 'application/json',
		});
	} catch (error: unknown) {
		const errorMsg = error instanceof Error ? error.message : String(error);
		context.error('Failed to send monitor result to Service Bus', errorMsg);
		throw new Error(`Service Bus send failure: ${errorMsg}`);
	}
}

app.serviceBusQueue('pingWorkerTrigger', {
	connection: 'SERVICE_BUS_CONNECTION_STRING',
	queueName: config.queueName,
	handler: processPingTask,
});
