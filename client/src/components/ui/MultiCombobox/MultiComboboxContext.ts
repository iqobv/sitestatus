'use client';

import { createContext, useContext } from 'react';
import { MultiComboboxContextValue } from './MultiCombobox.types';

export const MultiComboboxContext = createContext<
	MultiComboboxContextValue | undefined
>(undefined);

export const useMultiComboboxContext = () => {
	const context = useContext(MultiComboboxContext);

	if (!context)
		throw new Error(
			'MultiCombobox components must be used within a MultiCombobox',
		);

	return context;
};
