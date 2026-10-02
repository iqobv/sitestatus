'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { ModalClose } from '../Modal/Modal';
import { ModalBody } from '../Modal/ModalParts/ModalBody';
import { ModalFooter } from '../Modal/ModalParts/ModalFooter';
import { ModalHeader } from '../Modal/ModalParts/ModalHeader';
import { TextField } from '../TextField/TextField';
import styles from './ConfirmAction.module.scss';
import { ConfirmActionProps } from './ConfirmAction.types';

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
	inputPlaceholder,
	inputLabel,
}: ConfirmActionBodyProps) => {
	const [inputValue, setInputValue] = useState('');
	const [isConfirmDisabled, setIsConfirmDisabled] = useState(confirmWithInput);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	useEffect(() => {
		if (confirmWithInput && exceptedInputValue)
			setIsConfirmDisabled(inputValue !== exceptedInputValue);
	}, [inputValue, confirmWithInput, exceptedInputValue]);

	const handleConfirm = () => {
		if (!isConfirmDisabled) onConfirm();
	};

	return (
		<>
			<ModalHeader>{title}</ModalHeader>
			<ModalBody>{description}</ModalBody>
			<ModalFooter className={styles.footer}>
				{confirmWithInput && (
					<TextField
						label={
							inputLabel ? (
								inputLabel
							) : (
								<>
									Type the "
									<strong
										style={{
											display: 'inline-block',
										}}
									>
										{exceptedInputValue}
									</strong>
									" to confirm
								</>
							)
						}
						placeholder={inputPlaceholder || exceptedInputValue}
						value={inputValue}
						onChange={handleInputChange}
						autoComplete="off"
					/>
				)}
				<div className={styles.buttons}>
					<ModalClose asChild>
						<Button variant="outlined" onClick={onCancel}>
							{cancelButtonText}
						</Button>
					</ModalClose>
					<Button
						color="danger"
						onClick={handleConfirm}
						disabled={isConfirmDisabled}
					>
						{confirmButtonText}
					</Button>
				</div>
			</ModalFooter>
		</>
	);
};
