'use client';

import clsx from 'clsx';
import { ComponentProps } from 'react';
import styles from './FormLabel.module.scss';

interface FormLabelProps extends ComponentProps<'label'> {
	children: React.ReactNode;
	isRequired?: boolean;
	disabled?: boolean;
}

export const FormLabel = ({
	id,
	children,
	isRequired,
	disabled,
	className,
	...rest
}: FormLabelProps) => {
	const classNames = clsx(
		styles.label,
		isRequired && styles.required,
		disabled && styles.disabled,
		className,
	);

	return (
		<label htmlFor={id} className={classNames} {...rest}>
			<div>{children}</div>
		</label>
	);
};
