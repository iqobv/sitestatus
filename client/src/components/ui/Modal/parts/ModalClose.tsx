'use client';

import ClonedElement from '../../ClonedElement';
import { useModalContext } from '../ModalContext';

const ModalClose = ({ children }: { children: React.ReactElement }) => {
	const { onClose } = useModalContext('Modal.Trigger');

	return ClonedElement({ children, callback: onClose });
};

export default ModalClose;
