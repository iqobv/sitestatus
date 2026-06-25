'use client';

import React from 'react';
import ClonedElement from '../../ClonedElement';
import { useModalContext } from '../ModalContext';

export const ModalTrigger = ({
	children,
}: {
	children: React.ReactElement;
}) => {
	const { onOpen } = useModalContext('Modal.Trigger');

	return ClonedElement({ children, callback: onOpen });
};
