'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useState } from 'react';
import { ComboboxProps } from './Combobox.types';
import { ComboboxContext } from './ComboboxContext';

export const Combobox = ({
	value = '',
	onValueChange,
	children,
	...props
}: ComboboxProps) => {
	const [open, setOpen] = useState(false);

	const handleValueChange = (newValue: string) => {
		onValueChange?.(newValue);
	};

	return (
		<ComboboxContext.Provider
			value={{ value, onValueChange: handleValueChange, setOpen }}
		>
			<PopoverPrimitive.Root open={open} onOpenChange={setOpen} {...props}>
				{children}
			</PopoverPrimitive.Root>
		</ComboboxContext.Provider>
	);
};
