'use client';

import clsx from 'clsx';
import { CommandItem } from 'cmdk';
import { MultiComboboxItemProps } from '../MultiCombobox.types';
import { useMultiComboboxContext } from '../MultiComboboxContext';
import styles from './MultiComboboxItem.module.scss';

export const MultiComboboxItem = ({
	children,
	value,
	className,
	keywords,
	ref,
}: MultiComboboxItemProps) => {
	const { values, onValuesChange, onValueRemove, setOpen } =
		useMultiComboboxContext();
	const isSelected = values.includes(value);

	return (
		<CommandItem
			ref={ref}
			value={value}
			keywords={keywords}
			onSelect={(currentValue) => {
				isSelected
					? onValueRemove(currentValue)
					: onValuesChange([...values, currentValue]);

				setOpen(false);
			}}
			className={clsx(styles.item, className)}
		>
			{children}
			{isSelected && <span className={styles.itemIndicator} />}
		</CommandItem>
	);
};
