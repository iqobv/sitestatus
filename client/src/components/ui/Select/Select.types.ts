import { IconType } from 'react-icons';

export interface SelectOption {
	label: string;
	value: string;
	icon?: IconType;
}

export interface SelectProps {
	options: SelectOption[];
	value?: string;
	onChange: (value: string) => void;
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	className?: string;
	error?: string;
}
