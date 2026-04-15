'use client';

import { createContext, useContext } from 'react';

interface ModalContextType {
	open: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
	undefined,
);

export const useModalContext = (componentName: string) => {
	const context = useContext(ModalContext);

	if (!context) {
		throw new Error(`${componentName} must be used within <Modal />`);
	}

	return context;
};
