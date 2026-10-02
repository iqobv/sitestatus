import { Control, FieldValues, Path } from 'react-hook-form';

export interface ComboboxOption {
	label: string;
	value: string;
}

export interface FormComboboxProps<T extends FieldValues> {
	name: Path<T>;
	control?: Control<T>;
	options: ComboboxOption[];
	placeholder?: string;
	searchPlaceholder?: string;
	emptyMessage?: string;
	className?: string;
	disabled?: boolean;
	isClearable?: boolean;
	onScrollEnd?: () => void;
	scrollThreshold?: number;
	isLoading?: boolean;
	searchValue?: string;
	onSearchChange?: (value: string) => void;
	shouldFilter?: boolean;
}
