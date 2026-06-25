'use client';

import { createContext, useContext } from 'react';
import { DropdownContextType } from './DropdownContext.types';

export const DropdownContext = createContext<DropdownContextType | undefined>(
	undefined,
);

export const useDropdown = (): DropdownContextType => {
	const context = useContext(DropdownContext);
	if (!context) {
		throw new Error('useDropdown must be used within a DropdownProvider');
	}
	return context;
};
