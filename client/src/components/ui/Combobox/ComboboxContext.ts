'use client';

import { createContext, useContext } from 'react';
import { ComboboxContextValue } from './Combobox.types';

export const ComboboxContext = createContext<ComboboxContextValue | undefined>(
	undefined,
);

export const useComboboxContext = () => {
	const context = useContext(ComboboxContext);

	if (!context)
		throw new Error('Combobox components must be used within a Combobox');

	return context;
};
