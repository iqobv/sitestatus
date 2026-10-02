import { Control, FieldValues, Path } from 'react-hook-form';
import { MultiComboboxOption } from '../MultiCombobox/MultiCombobox.types';
import { WidthOption } from '../Select/Select.types';

export interface FormMultiComboboxProps<T extends FieldValues> {
	name: Path<T>;
	control?: Control<T>;
	options: MultiComboboxOption[];
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
	zIndex?: number;
	menuWidth?: WidthOption;
}
