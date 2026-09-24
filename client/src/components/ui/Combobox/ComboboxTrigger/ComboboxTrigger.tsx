'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';
import { KeyboardEvent, MouseEvent } from 'react';
import { MdArrowDropUp, MdClose } from 'react-icons/md';
import { Button } from '../../Button/Button';
import styles from '../../Select/SelectTrigger/SelectTrigger.module.scss';
import { ComboboxTriggerProps } from '../Combobox.types';
import { useComboboxContext } from '../ComboboxContext';

export const ComboboxTrigger = ({
	children,
	placeholder,
	className,
	ref,
	showClearButton = false,
	onClear,
	disabled = false,
	...props
}: ComboboxTriggerProps) => {
	const { setOpen } = useComboboxContext();

	const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onClear?.();
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			setOpen(true);
		}
	};

	return (
		<div className={styles.container}>
			<PopoverPrimitive.Trigger
				ref={ref}
				className={clsx(styles.trigger, className)}
				disabled={disabled}
				onKeyDown={handleKeyDown}
				{...props}
			>
				<span className={styles.valueWrapper}>
					{children || (
						<span className={styles.placeholder}>{placeholder}</span>
					)}
				</span>
				<div className={styles.actionsWrapper}>
					{showClearButton && <span className={styles.clearSpacer} />}
					<MdArrowDropUp size={26} className={styles.icon} />
				</div>
			</PopoverPrimitive.Trigger>
			{showClearButton && (
				<Button
					type="button"
					className={styles.clearBtn}
					onClick={handleClear}
					tabIndex={-1}
					disabled={disabled}
					size="sm"
					variant="text"
					isIcon
					isRounded
				>
					<MdClose size={18} />
				</Button>
			)}
		</div>
	);
};
