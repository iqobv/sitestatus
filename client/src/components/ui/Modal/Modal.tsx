'use client';

import React, { ReactElement, useState } from 'react';
import { ModalContext } from './ModalContext';
import { ModalContent } from './parts/ModalContent/ModalContent';
import { ModalTrigger } from './parts/ModalTrigger';

interface ModalProps {
	children: React.ReactNode;
	withoutTrigger?: boolean;
	renderOnMount?: boolean;
	onClose?: () => void;
}

export const Modal = ({
	children,
	withoutTrigger = false,
	renderOnMount = false,
	onClose,
}: ModalProps) => {
	const [open, setOpen] = useState(renderOnMount);

	const openModal = () => setOpen(true);

	const closeModal = () => {
		setOpen(false);
		if (onClose) {
			onClose();
		}
	};

	const childrenArray = React.Children.toArray(children) as ReactElement[];

	const trigger = childrenArray.find((child) => child.type === ModalTrigger);

	const content = childrenArray.find((child) => child.type === ModalContent);

	if (process.env.NODE_ENV === 'development') {
		if (!trigger && !withoutTrigger) {
			throw new Error('Modal must have a Modal.Trigger component as a child.');
		}

		if (!content) {
			throw new Error('Modal must have a Modal.Content component as a child.');
		}
	}

	return (
		<ModalContext.Provider
			value={{ open, onOpen: openModal, onClose: closeModal }}
		>
			{children}
		</ModalContext.Provider>
	);
};
