import { Config } from '../config/env.js';
import { MonitorTask } from '../types/monitor-task.types.js';
import { PingResultPayload } from '../types/ping-result-payload.types.js';

export class ApiService {
	constructor(private config: Config) {}

	async fetchTasks(): Promise<MonitorTask[]> {
		const response = await fetch(
			`${this.config.apiUrl}/v1/internal/ping/tasks`,
			{
				method: 'GET',
				headers: {
					'x-worker-secret': this.config.workerSecret,
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch tasks: ${response.statusText}`);
		}

		return (await response.json()) as MonitorTask[];
	}

	async submitResults(results: PingResultPayload[]): Promise<void> {
		const response = await fetch(
			`${this.config.apiUrl}/v1/internal/ping/results`,
			{
				method: 'POST',
				headers: {
					'x-worker-secret': this.config.workerSecret,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(results),
			},
		);

		if (!response.ok) {
			throw new Error(`Failed to submit results: ${response.statusText}`);
		}
	}
}
