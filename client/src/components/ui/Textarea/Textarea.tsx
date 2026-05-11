'use client';

import { ChangeEvent, useEffect, useId, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { FormLabel } from '../Form/parts';
import styles from './Textarea.module.scss';
import { TextareaProps } from './Textarea.types';

const Textarea = ({
	minRows = 1,
	maxRows = 3,
	maxLength,
	onChange,
	value,
	defaultValue,
	error,
	label,
	id,
	ref,
	...rest
}: TextareaProps) => {
	const generatedId = useId();
	const finalId = id ?? generatedId;

	const [count, setCount] = useState<number>(0);

	useEffect(() => {
		if (value !== undefined && value !== null) {
			setCount(String(value).length);
		} else if (defaultValue !== undefined && defaultValue !== null) {
			setCount(String(defaultValue).length);
		}
	}, [value, defaultValue]);

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setCount(event.target.value.length);
		if (onChange) {
			onChange(event);
		}
	};

	return (
		<div className={styles.container}>
			{label && <FormLabel id={finalId}>{label}</FormLabel>}
			<TextareaAutosize
				className={`${styles.textarea} ${error ? styles.error : ''} ${rest.className || ''}`}
				minRows={minRows}
				maxRows={maxRows}
				maxLength={maxLength}
				onChange={handleChange}
				value={value}
				defaultValue={defaultValue}
				id={finalId}
				ref={ref}
				{...rest}
			/>
			<div className={styles.footer}>
				{error && <div className="error-message">{error}</div>}
				{maxLength && maxLength > 0 && (
					<div className={styles.counter}>
						{count}/{maxLength}
					</div>
				)}
			</div>
		</div>
	);
};

export default Textarea;
