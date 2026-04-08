import { createErrorDomain } from '../utils';
import {
	AUTH_ERROR_MESSAGES,
	MONITOR_ERROR_MESSAGES,
	PROJECT_ERROR_MESSAGES,
	REGION_ERROR_MESSAGES,
	TOKEN_ERROR_MESSAGES,
	USER_ERROR_MESSAGES,
} from './error-messages';

export const ERROR_MESSAGES = {
	AUTH: createErrorDomain(AUTH_ERROR_MESSAGES),
	MONITOR: createErrorDomain(MONITOR_ERROR_MESSAGES),
	PROJECT: createErrorDomain(PROJECT_ERROR_MESSAGES),
	REGION: createErrorDomain(REGION_ERROR_MESSAGES),
	TOKEN: createErrorDomain(TOKEN_ERROR_MESSAGES),
	USER: createErrorDomain(USER_ERROR_MESSAGES),
} as const;
