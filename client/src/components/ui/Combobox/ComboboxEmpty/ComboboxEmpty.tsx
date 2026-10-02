'use client';

import clsx from 'clsx';
import { CommandEmpty } from 'cmdk';
import styles from '../../Select/SelectItem/SelectItem.module.scss';
import { ComboboxEmptyProps } from '../Combobox.types';

export const ComboboxEmpty = ({ children, className }: ComboboxEmptyProps) => {
	return (
		<CommandEmpty
			className={clsx(styles.item, className)}
			style={{ pointerEvents: 'none' }}
		>
			{children}
		</CommandEmpty>
	);
};
