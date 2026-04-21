import { DefaultFields } from '../defaultFields.types';

export interface Project extends DefaultFields {
	slug: string;
	name: string;
	description: string | null;
}
