import { HttpMethod } from './http-method.types.js';

export interface PerformPingPayload {
	url: string;
	method: HttpMethod;
}
