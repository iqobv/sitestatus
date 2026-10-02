import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Ref } from 'react';
import { WidthOption } from '../Select/Select.types';

export interface MultiComboboxOption {
	label: string;
	value: string;
}

export interface MultiComboboxContextValue {
	values: string[];
	open: boolean;
	onValuesChange: (values: string[]) => void;
	onValueRemove: (value: string) => void;
	setOpen: (open: boolean) => void;
}

export interface MultiComboboxProps extends PopoverPrimitive.PopoverProps {
	children: React.ReactNode;
	values?: string[];
	onValuesChange?: (values: string[]) => void;
}

export interface MultiComboboxTriggerProps
	extends PopoverPrimitive.PopoverTriggerProps {
	children?: React.ReactNode;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	options?: MultiComboboxOption[];
}

export interface MultiComboboxContentProps extends Omit<
	PopoverPrimitive.PopoverContentProps,
	'ref'
> {
	children: React.ReactNode;
	ref?: Ref<HTMLDivElement>;
	width?: WidthOption;
	onScrollEnd?: () => void;
	scrollThreshold?: number;
	isLoading?: boolean;
	searchPlaceholder?: string;
	searchValue?: string;
	onSearchChange?: (value: string) => void;
	shouldFilter?: boolean;
}

export interface MultiComboboxItemProps {
	value: string;
	children: React.ReactNode;
	className?: string;
	keywords?: string[];
	ref?: Ref<HTMLDivElement>;
}
