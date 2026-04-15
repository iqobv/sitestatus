'use client';

import React from 'react';
import ClonedElement from '../../ClonedElement';
import { useModalContext } from '../ModalContext';

const ModalTrigger = ({ children }: { children: React.ReactElement }) => {
	const { onOpen } = useModalContext('Modal.Trigger');

	return ClonedElement({ children, callback: onOpen });
};

export default ModalTrigger;
