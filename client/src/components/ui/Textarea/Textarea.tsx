'use client';

import { ChangeEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
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
	...rest
}: TextareaProps) => {
	const getInitialCount = (): number => {
		if (typeof value === 'string') return value.length;
		if (typeof value === 'number') return String(value).length;
		if (typeof defaultValue === 'string') return defaultValue.length;
		if (typeof defaultValue === 'number') return String(defaultValue).length;
		return 0;
	};

	const [count, setCount] = useState<number>(getInitialCount());

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setCount(event.target.value.length);
		if (onChange) {
			onChange(event);
		}
	};

	return (
		<div className={styles.container}>
			<TextareaAutosize
				className={`${styles.textarea} ${error ? styles.error : ''} ${rest.className || ''}`}
				minRows={minRows}
				maxRows={maxRows}
				maxLength={maxLength}
				onChange={handleChange}
				value={value}
				defaultValue={defaultValue}
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
