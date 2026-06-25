'use client';

import { Modal } from '../Modal/Modal';
import { ModalContent } from '../Modal/parts/ModalContent/ModalContent';
import { ModalTrigger } from '../Modal/parts/ModalTrigger';
import { ConfirmActionProps } from './ConfirmAction.types';
import { ConfirmActionBody } from './ConfirmActionBody';

export const ConfirmAction = ({ trigger, ...props }: ConfirmActionProps) => {
	return (
		<Modal>
			<ModalTrigger>{trigger}</ModalTrigger>
			<ModalContent>
				<ConfirmActionBody {...props} />
			</ModalContent>
		</Modal>
	);
};
