'use client';

import { Dropdown } from '../Dropdown/Dropdown';
import { DropdownItem } from '../Dropdown/DropdownItem';
import { DropdownMenu } from '../Dropdown/DropdownMenu';
import { DropdownTrigger } from '../Dropdown/DropdownTrigger';
import styles from './Select.module.scss';
import { OptionValue, SelectProps } from './Select.types';

export const Select = ({
	options,
	value,
	placeholder = 'Select an option',
	label,
	disabled = false,
	className = '',
	error = '',
	onChange,
	multiple,
	isLoading = false,
	onScrollEnd,
}: SelectProps) => {
	const getDisplayLabel = (): string => {
		if (multiple && Array.isArray(value)) {
			const selectedOptions = options.filter((opt) =>
				value.includes(opt.value),
			);
			return selectedOptions.length > 0
				? selectedOptions.map((opt) => opt.label).join(', ')
				: placeholder;
		}

		const selectedOption = options.find((opt) => opt.value === value);
		return selectedOption ? selectedOption.label : placeholder;
	};

	const handleOptionClick = (optionValue: OptionValue) => {
		if (multiple) {
			const currentValue = Array.isArray(value) ? value : [];
			if (currentValue.includes(optionValue)) {
				onChange(currentValue.filter((v) => v !== optionValue));
			} else {
				onChange([...currentValue, optionValue]);
			}
		} else {
			onChange(optionValue);
		}
	};

	const isSelected = (optionValue: OptionValue): boolean => {
		if (multiple && Array.isArray(value)) {
			return value.includes(optionValue);
		}
		return value === optionValue;
	};

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
		if (
			scrollHeight - scrollTop <= clientHeight + 10 &&
			onScrollEnd &&
			!isLoading
		) {
			onScrollEnd();
		}
	};

	return (
		<div className={styles.selectContainer}>
			<label className={styles.select}>
				{label && <p className={styles.selectLabel}>{label}</p>}
				<Dropdown>
					<DropdownTrigger>
						<button
							type="button"
							className={`${styles.trigger} ${error ? styles.error : ''} ${className}`.trim()}
							disabled={disabled}
						>
							<span className={styles.valueContainer}>{getDisplayLabel()}</span>
							<span className={styles.chevron}>▼</span>
						</button>
					</DropdownTrigger>
					<DropdownMenu menuWidth="trigger" onScroll={handleScroll}>
						{options.map((option) => {
							const Icon = option.icon;

							return (
								<DropdownItem
									key={String(option.value)}
									onClick={() => handleOptionClick(option.value)}
									className={isSelected(option.value) ? styles.selected : ''}
									closeOnClick={!multiple}
								>
									{Icon && <Icon size={20} />}
									{multiple && (
										<input
											type="checkbox"
											checked={isSelected(option.value)}
											readOnly
											className={styles.checkbox}
										/>
									)}
									{option.label}
								</DropdownItem>
							);
						})}
					</DropdownMenu>
				</Dropdown>
			</label>
			{error && <p className="error-message">{error}</p>}
		</div>
	);
};
