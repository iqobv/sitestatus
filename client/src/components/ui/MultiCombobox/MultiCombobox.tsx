'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useState } from 'react';
import { MultiComboboxProps } from './MultiCombobox.types';
import { MultiComboboxContext } from './MultiComboboxContext';

export const MultiCombobox = ({
	children,
	onValuesChange,
	values = [],
	...props
}: MultiComboboxProps) => {
	const [open, setOpen] = useState(false);

	const handleValuesChange = (newValues: string[]) =>
		onValuesChange?.(newValues);

	const handleValueRemove = (valueToRemove: string) => {
		const newValues = values.filter((value) => value !== valueToRemove);
		handleValuesChange(newValues || []);
	};

	return (
		<MultiComboboxContext.Provider
			value={{
				open,
				values,
				onValueRemove: handleValueRemove,
				onValuesChange: handleValuesChange,
				setOpen,
			}}
		>
			<PopoverPrimitive.Root open={open} onOpenChange={setOpen} {...props}>
				{children}
			</PopoverPrimitive.Root>
		</MultiComboboxContext.Provider>
	);
};
