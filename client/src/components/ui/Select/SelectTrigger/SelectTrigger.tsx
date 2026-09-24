'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import clsx from 'clsx';
import { MouseEvent } from 'react';
import { MdArrowDropUp, MdClose } from 'react-icons/md';
import { Button } from '../../Button/Button';
import { SelectTriggerProps } from '../Select.types';
import styles from './SelectTrigger.module.scss';

export const SelectTrigger = ({
	children,
	placeholder,
	className,
	ref,
	showClearButton = false,
	onClear,
	disabled,
	...props
}: SelectTriggerProps) => {
	const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onClear?.();
	};

	return (
		<div className={styles.container}>
			<SelectPrimitive.Trigger
				ref={ref}
				className={clsx(styles.trigger, className)}
				{...props}
			>
				<span className={styles.valueWrapper}>
					{children || <SelectPrimitive.Value placeholder={placeholder} />}
				</span>
				<div className={styles.actionsWrapper}>
					{showClearButton && <span className={styles.clearSpacer} />}
					<MdArrowDropUp size={26} className={styles.icon} />
				</div>
			</SelectPrimitive.Trigger>
			{showClearButton && (
				<Button
					size="sm"
					onClick={handleClear}
					variant="text"
					isIcon
					isRounded
					type="button"
					className={styles.clearBtn}
					tabIndex={-1}
					disabled={disabled}
				>
					<MdClose size={18} />
				</Button>
			)}
		</div>
	);
};
