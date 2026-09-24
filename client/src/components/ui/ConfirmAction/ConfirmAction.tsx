'use client';

import { Modal, ModalTrigger } from '../Modal/Modal';
import { ModalContent } from '../Modal/ModalContent/ModalContent';
import { ConfirmActionProps } from './ConfirmAction.types';
import { ConfirmActionBody } from './ConfirmActionBody';

export const ConfirmAction = ({ trigger, ...props }: ConfirmActionProps) => {
	return (
		<Modal>
			<ModalTrigger asChild>{trigger}</ModalTrigger>
			<ModalContent>
				<ConfirmActionBody {...props} />
			</ModalContent>
		</Modal>
	);
};
