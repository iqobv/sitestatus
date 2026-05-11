'use client';

import { RowData, Table } from '@tanstack/react-table';
import { createContext, useContext } from 'react';

export interface TableContextType {
	table: Table<unknown>;
	getRowHref?: (row: unknown) => string | undefined;
}

export const TableContext = createContext<TableContextType | undefined>(
	undefined,
);

export const useTableContext = <T extends RowData>() => {
	const context = useContext(TableContext);

	if (!context) {
		throw new Error('useTableContext must be used within <Table />');
	}

	return context;
};
