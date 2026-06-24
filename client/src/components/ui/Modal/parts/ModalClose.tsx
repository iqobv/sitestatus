'use client';

import ClonedElement from '../../ClonedElement';
import { useModalContext } from '../ModalContext';

export const ModalClose = ({ children }: { children: React.ReactElement }) => {
	const { onClose } = useModalContext('Modal.Trigger');

	return ClonedElement({ children, callback: onClose });
};
