import { DefaultFields } from '../defaultFields.types';
import { BaseRegion } from './baseRegion.types';

export interface Region extends BaseRegion, DefaultFields {
	continent: string;
	isActive: boolean;
	longitude: number | null;
	latitude: number | null;
}
