'use client';

import { ComponentProps } from 'react';
import styles from './FormLabel.module.scss';

interface FormLabelProps extends ComponentProps<'label'> {
	children: React.ReactNode;
	isRequired?: boolean;
}

export default function FormLabel({
	id,
	children,
	isRequired,
	...rest
}: FormLabelProps) {
	return (
		<label htmlFor={id} className={styles.label} {...rest}>
			<div>{children}</div>
			{isRequired && <span className={styles.required}>*</span>}
		</label>
	);
}
