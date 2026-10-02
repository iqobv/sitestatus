'use client';

import clsx from 'clsx';
import { CommandItem } from 'cmdk';
import styles from '../../Select/SelectItem/SelectItem.module.scss';
import { ComboboxItemProps } from '../Combobox.types';
import { useComboboxContext } from '../ComboboxContext';

export const ComboboxItem = ({
	value,
	children,
	className,
	ref,
}: ComboboxItemProps) => {
	const { value: selectedValue, onValueChange, setOpen } = useComboboxContext();
	const isSelected = selectedValue === value;

	return (
		<CommandItem
			ref={ref}
			value={value}
			onSelect={(currentValue) => {
				onValueChange(currentValue === selectedValue ? '' : currentValue);
				setOpen(false);
			}}
			className={clsx(styles.item, className)}
		>
			{children}
			{isSelected && <span className={styles.itemIndicator} />}
		</CommandItem>
	);
};
