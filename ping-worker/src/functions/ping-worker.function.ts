import { app, InvocationContext, Timer } from '@azure/functions';
import { getConfig } from '../config/env.js';
import { ApiService } from '../services/api.service.js';
import { performPing } from '../services/pinger.service.js';
import { PingResultPayload } from '../types/ping-result-payload.types.js';

export async function pingWorkerHandler(
	myTimer: Timer,
	context: InvocationContext,
): Promise<void> {
	try {
		const config = getConfig();
		const apiService = new ApiService(config);

		const tasks = await apiService.fetchTasks();

		if (tasks.length === 0) return;

		const results: PingResultPayload[] = await Promise.all(
			tasks.map(async (task) => {
				const pingResult = await performPing(task.url);

				return {
					monitorId: task.id,
					...pingResult,
				};
			}),
		);

		await apiService.submitResults(results);
	} catch (error: unknown) {
		context.error(
			`Worker execution failed: ${error instanceof Error ? error.message : String(error)}`,
		);
	}
}

app.timer('pingWorkerTimer', {
	schedule: '0 * * * * *',
	handler: pingWorkerHandler,
});
