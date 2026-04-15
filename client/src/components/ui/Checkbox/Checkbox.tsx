'use client';

import { ComponentPropsWithRef } from 'react';
import styles from './Checkbox.module.scss';

interface CheckboxProps extends ComponentPropsWithRef<'input'> {
	label?: string;
	error?: string;
	isBordered?: boolean;
}

const Checkbox = ({
	label,
	error,
	ref,
	isBordered = false,
	...props
}: CheckboxProps) => {
	const wrapperClass = `
    ${styles['checkbox__wrapper']}
    ${isBordered ? styles['checkbox__wrapper--bordered'] : ''}
    ${error ? styles['has-error'] : ''}
  `.trim();

	return (
		<div className={wrapperClass}>
			<label className={styles['checkbox__container']}>
				<input
					type="checkbox"
					className={styles['checkbox__input']}
					ref={ref}
					{...props}
				/>
				<span className={styles['checkbox__label-text']}>{label}</span>
			</label>
			{error && <p className="error-message">{error}</p>}
		</div>
	);
};

export default Checkbox;
