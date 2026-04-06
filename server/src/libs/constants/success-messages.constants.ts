import { createErrorDomain } from '../utils';
import {
	AUTH_SUCCESS_MESSAGES,
	MONITOR_SUCCESS_MESSAGES,
	PROJECT_SUCCESS_MESSAGES,
	USER_SUCCESS_MESSAGES,
} from './success-messages';

export const SUCCESS_MESSAGES = {
	AUTH: createErrorDomain(AUTH_SUCCESS_MESSAGES),
	MONITOR: createErrorDomain(MONITOR_SUCCESS_MESSAGES),
	PROJECT: createErrorDomain(PROJECT_SUCCESS_MESSAGES),
	USER: createErrorDomain(USER_SUCCESS_MESSAGES),
};
