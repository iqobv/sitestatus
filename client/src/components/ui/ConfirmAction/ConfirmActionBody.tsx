'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { ModalClose } from '../Modal/parts/ModalClose';
import { TextField } from '../TextField/TextField';
import styles from './ConfirmAction.module.scss';
import { ConfirmActionProps } from './ConfirmAction.types';
import { ModalHeader } from '../Modal/parts/ModalHeader/ModalHeader';
import { ModalBody } from '../Modal/parts/ModalBody/ModalBody';
import { ModalFooter } from '../Modal/parts/ModalFooter';

type ConfirmActionBodyProps = Omit<ConfirmActionProps, 'trigger'>;

export const ConfirmActionBody = ({
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
			<ModalHeader>{title}</ModalHeader>
			<ModalBody>{description}</ModalBody>
			<ModalFooter className={styles.footer}>
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
					<ModalClose>
						<Button variant="outlined" onClick={onCancel}>
							{cancelButtonText}
						</Button>
					</ModalClose>
					<ModalClose>
						<Button
							variant="danger"
							onClick={handleConfirm}
							disabled={isConfirmDisabled}
						>
							{confirmButtonText}
						</Button>
					</ModalClose>
				</div>
			</ModalFooter>
		</>
	);
};
