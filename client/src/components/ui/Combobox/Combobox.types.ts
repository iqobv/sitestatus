import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Ref } from 'react';

export type WidthOption =
	| 'trigger'
	| 'fit-content'
	| 'max-content'
	| 'min-content'
	| 'auto'
	| number
	| (string & {});

export interface ComboboxContextValue {
	value: string;
	onValueChange: (value: string) => void;
	setOpen: (open: boolean) => void;
}

export interface ComboboxProps extends PopoverPrimitive.PopoverProps {
	value?: string;
	onValueChange?: (value: string) => void;
	children: React.ReactNode;
}

export interface ComboboxTriggerProps extends Omit<
	PopoverPrimitive.PopoverTriggerProps,
	'ref'
> {
	placeholder?: string;
	ref?: Ref<HTMLButtonElement>;
	showClearButton?: boolean;
	onClear?: () => void;
}

export interface ComboboxContentProps extends Omit<
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

export interface ComboboxItemProps {
	value: string;
	children: React.ReactNode;
	className?: string;
	ref?: Ref<HTMLDivElement>;
}

export interface ComboboxEmptyProps {
	children: React.ReactNode;
	className?: string;
}
