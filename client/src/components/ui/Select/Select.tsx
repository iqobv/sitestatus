'use client';

import Dropdown from '../Dropdown';
import styles from './Select.module.scss';
import { SelectProps } from './Select.types';

const Select = ({
	options,
	value,
	onChange,
	placeholder = 'Select an option',
	label,
	disabled = false,
	className = '',
	error = '',
}: SelectProps) => {
	const selectedOption = options.find((opt) => opt.value === value);

	return (
		<div className={styles.selectContainer}>
			<label className={styles.select}>
				{label && <p className={styles.selectLabel}>{label}</p>}
				<Dropdown>
					<Dropdown.Trigger>
						<button
							type="button"
							className={`${styles.trigger} ${error ? styles.error : ''} ${className}`.trim()}
							disabled={disabled}
						>
							<span>{selectedOption ? selectedOption.label : placeholder}</span>
							<span className={styles.chevron}>▼</span>
						</button>
					</Dropdown.Trigger>
					<Dropdown.Menu menuWidth="trigger">
						{options.map((option) => (
							<Dropdown.Item
								key={option.value}
								onClick={() => onChange(option.value)}
								className={value === option.value ? styles.selected : ''}
							>
								{option.label}
							</Dropdown.Item>
						))}
					</Dropdown.Menu>
				</Dropdown>
			</label>
			{error && <p className="error-message">{error}</p>}
		</div>
	);
};

export default Select;
