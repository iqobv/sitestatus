'use client';

import { RowData, Table } from '@tanstack/react-table';
import { createContext, useContext } from 'react';

interface TableContextType<T extends RowData> {
	table: Table<T>;
}

export const TableContext = createContext<
	TableContextType<unknown> | undefined
>(undefined);

export const useTableContext = <T extends RowData>() => {
	const context = useContext(TableContext);

	if (!context) {
		throw new Error('useTableContext must be used within <Table />');
	}

	return context as TableContextType<T>;
};
