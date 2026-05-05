import { IconType } from 'react-icons';

export type OptionValue = string | number;

export interface SelectOption {
	label: string;
	value: OptionValue;
	icon?: IconType;
}

interface BaseSelectProps {
	options: SelectOption[];
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	className?: string;
	error?: string;
}

export interface SingleSelectProps extends BaseSelectProps {
	multiple?: false;
	value: OptionValue | null;
	onChange: (value: OptionValue) => void;
}

export interface MultiSelectProps extends BaseSelectProps {
	multiple: true;
	value: OptionValue[];
	onChange: (value: OptionValue[]) => void;
}

export type SelectProps = SingleSelectProps | MultiSelectProps;
