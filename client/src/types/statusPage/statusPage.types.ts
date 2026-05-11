import { DefaultFields } from '../defaultFields.types';
import { FullStatusPageMonitor } from './statusPageMonitor.types';

export interface StatusPage extends DefaultFields {
	userId: string;
	slug: string;
	title: string;
	description: string | null;
	isPublished: boolean;
	customDomain: string | null;
	iconUrl: string | null;
}

export interface FullStatusPage extends StatusPage {
	monitors: FullStatusPageMonitor[];
}
