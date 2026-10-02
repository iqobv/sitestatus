import { IconType } from 'react-icons';

export interface Option<T = string> {
	label: string;
	value: T;
	icon?: IconType;
}
