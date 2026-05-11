'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import TextField from '../TextField/TextField';
import styles from './ConfirmAction.module.scss';
import { ConfirmActionProps } from './ConfirmAction.types';

type ConfirmActionBodyProps = Omit<ConfirmActionProps, 'trigger'>;

const ConfirmActionBody = ({
	title,
	description,
	onConfirm,
	onCancel = () => {},
	cancelButtonText = 'Cancel',
	confirmButtonText = 'Confirm',
	confirmWithInput = false,
	exceptedInputValue = 'DELETE',
}: ConfirmActionBodyProps) => {
	const [inputValue, setInputValue] = useState('');
	const [isConfirmDisabled, setIsConfirmDisabled] = useState(confirmWithInput);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	useEffect(() => {
		if (confirmWithInput && exceptedInputValue) {
			setIsConfirmDisabled(inputValue !== exceptedInputValue);
		}
	}, [inputValue, confirmWithInput, exceptedInputValue]);

	const handleConfirm = () => {
		if (!isConfirmDisabled) {
			onConfirm();
		}
	};

	return (
		<>
			<Modal.Header>{title}</Modal.Header>
			<Modal.Body>{description}</Modal.Body>
			<Modal.Footer className={styles.footer}>
				{confirmWithInput && (
					<TextField
						label={
							<>
								Enter <strong>{exceptedInputValue}</strong> to confirm
							</>
						}
						placeholder={exceptedInputValue}
						value={inputValue}
						onChange={handleInputChange}
						autoComplete="off"
					/>
				)}
				<div className={styles.buttons}>
					<Modal.Close>
						<Button variant="outlined" onClick={onCancel}>
							{cancelButtonText}
						</Button>
					</Modal.Close>
					<Modal.Close>
						<Button
							variant="danger"
							onClick={handleConfirm}
							disabled={isConfirmDisabled}
						>
							{confirmButtonText}
						</Button>
					</Modal.Close>
				</div>
			</Modal.Footer>
		</>
	);
};

export default ConfirmActionBody;
