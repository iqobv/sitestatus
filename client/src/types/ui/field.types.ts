import { Path } from 'react-hook-form';
import { IconType } from 'react-icons';
import { Option } from './option.types';

export interface Field<T> {
	name: Path<T>;
	label: string;
	placeholder: string;
	type?: React.ComponentProps<'input'>['type'] | 'textarea' | 'select';
	autoComplete?: React.ComponentProps<'input'>['autoComplete'];
	leftIcon?: IconType;
	rightIcon?: IconType;
	isRequired?: boolean;
	options?: Option[];
}
