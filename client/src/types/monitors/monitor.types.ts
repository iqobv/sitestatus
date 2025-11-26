import { TMonitorStatus } from './monitorStatus.types';
import { IPingResult } from './pingResults.types';

export interface IMonitor {
	id: string;
	name: string;
	url: string;
	checkIntervalSeconds: number;
	nextCheckAt: Date;
	lastCheckedAt: Date;
	lastStatus: TMonitorStatus;
	isActive: boolean;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IMonitorWithPingResults extends IMonitor {
	pingResults: IPingResult[];
}
