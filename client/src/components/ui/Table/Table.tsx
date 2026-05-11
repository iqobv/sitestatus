'use client';

import {
	getCoreRowModel,
	RowData,
	TableOptions,
	Table as TableType,
	useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import styles from './Table.module.scss';
import TableBody from './TableBody/TableBody';
import { TableContext, TableContextType } from './TableContext';
import TableFooter from './TableFooter/TableFooter';
import TableHeader from './TableHeader/TableHeader';

export interface CustomTableProps<T extends RowData> extends TableOptions<T> {
	getRowHref?: (row: T) => string | undefined;
}

const Table = <T extends RowData>(props: CustomTableProps<T>) => {
	const options = useMemo(
		() => ({
			...props,
			getCoreRowModel: props.getCoreRowModel ?? getCoreRowModel(),
		}),
		[props],
	);

	const table = useReactTable(options);

	const contextValue: TableContextType = {
		table: table as unknown as TableType<unknown>,
		getRowHref: props.getRowHref as
			| ((row: unknown) => string | undefined)
			| undefined,
	};

	const hasFooters = table
		.getAllColumns()
		.some((column) => column.columnDef.footer);

	return (
		<TableContext.Provider value={contextValue}>
			<div className={styles.container}>
				<table className={styles.table}>
					<TableHeader />
					<TableBody />
					{hasFooters && <TableFooter />}
				</table>
			</div>
		</TableContext.Provider>
	);
};

export default Table;
