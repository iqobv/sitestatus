'use client';

import Modal from '../Modal/Modal';
import { ConfirmActionProps } from './ConfirmAction.types';
import ConfirmActionBody from './ConfirmActionBody';

const ConfirmAction = ({ trigger, ...props }: ConfirmActionProps) => {
	return (
		<Modal>
			<Modal.Trigger>{trigger}</Modal.Trigger>
			<Modal.Content>
				<ConfirmActionBody {...props} />
			</Modal.Content>
		</Modal>
	);
};

export default ConfirmAction;
