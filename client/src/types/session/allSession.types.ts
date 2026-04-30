import { Session } from './session.types';

export interface AllSessions {
	currentSession: Session;
	otherSessions: Session[];
}
