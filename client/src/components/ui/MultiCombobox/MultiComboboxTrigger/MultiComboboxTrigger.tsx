'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';
import { KeyboardEvent, MouseEvent, PointerEvent } from 'react';
import { MdArrowDropUp, MdClose } from 'react-icons/md';
import { MultiComboboxTriggerProps } from '../MultiCombobox.types';
import { useMultiComboboxContext } from '../MultiComboboxContext';
import styles from './MultiComboboxTrigger.module.scss';

export const MultiComboboxTrigger = ({
	className,
	disabled,
	placeholder,
	children,
	options = [],
	...props
}: MultiComboboxTriggerProps) => {
	const { values, open, setOpen, onValueRemove } = useMultiComboboxContext();

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (disabled) return;

		if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
			e.preventDefault();
			setOpen(true);
		}
	};

	const handleRemoveClick = (e: MouseEvent<HTMLElement>, val: string) => {
		e.stopPropagation();

		if (!disabled) onValueRemove(val);
	};

	const handleRemoveKeyDown = (e: KeyboardEvent<HTMLElement>, val: string) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			e.stopPropagation();
			if (!disabled) onValueRemove(val);
		}
	};

	const handleRemovePointerDown = (e: PointerEvent<HTMLElement>) => {
		e.stopPropagation();
	};

	const getLabel = (val: string) => {
		const option = options.find((opt) => opt.value === val);
		return option ? option.label : val;
	};

	return (
		<div className={styles.container}>
			<PopoverPrimitive.Trigger asChild {...props}>
				<div
					className={clsx(styles.trigger, className)}
					tabIndex={disabled ? -1 : 0}
					role="combobox"
					aria-expanded={open}
					aria-disabled={disabled}
					onKeyDown={handleKeyDown}
				>
					<div className={styles.chips}>
						{values.length === 0 && (
							<span className={styles.placeholder}>{placeholder}</span>
						)}
						{values.map((val) => (
							<span key={val} className={styles.chip}>
								{getLabel(val)}
								<button
									type="button"
									className={styles.chipRemoveBtn}
									aria-label={`Remove ${getLabel(val)}`}
									onClick={(e) => handleRemoveClick(e, val)}
									onPointerDown={handleRemovePointerDown}
									onKeyDown={(e) => handleRemoveKeyDown(e, val)}
									disabled={disabled}
								>
									<MdClose size={12} />
								</button>
							</span>
						))}
					</div>
					<div className={styles.triggerButton}>
						<MdArrowDropUp size={26} className={styles.icon} />
					</div>
				</div>
			</PopoverPrimitive.Trigger>
		</div>
	);
};
