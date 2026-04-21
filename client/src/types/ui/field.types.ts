import { Path } from 'react-hook-form';
import { IconType } from 'react-icons';

export interface Field<T> {
	name: Path<T>;
	label: string;
	placeholder: string;
	type?: React.ComponentProps<'input'>['type'] | 'textarea';
	autocomplete?: React.ComponentProps<'input'>['autoComplete'];
	iconLeft?: IconType;
	iconRight?: IconType;
	isRequired?: boolean;
}
