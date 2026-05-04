import { DefaultFields } from '../defaultFields.types';

export interface AlertSettings extends DefaultFields {
	userId: string;
	projectId: string | null;
	monitorId: string | null;
	isEnabled: boolean;
	onDown: boolean;
	onUp: boolean;
	delay: number;
}
