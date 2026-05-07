import { DefaultFields } from '../defaultFields.types';

export interface Project extends DefaultFields {
	name: string;
	description: string | null;
}
