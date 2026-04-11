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
import { TableContext } from './TableContext';
import TableFooter from './TableFooter/TableFooter';
import TableHeader from './TableHeader/TableHeader';

const Table = <T extends RowData>(props: TableOptions<T>) => {
	const options = useMemo(
		() => ({
			...props,
			getCoreRowModel: props.getCoreRowModel ?? getCoreRowModel(),
		}),
		[props],
	);

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable(options);

	const contextValue = {
		table: table as unknown as TableType<unknown>,
	};

	const hasFooters = table
		.getAllColumns()
		.some((column) => column.columnDef.footer);

	return (
		<TableContext.Provider value={contextValue}>
			<div className={styles['table-container']}>
				<table className={styles['table']}>
					<TableHeader />
					<TableBody />
					{hasFooters && <TableFooter />}
				</table>
			</div>
		</TableContext.Provider>
	);
};

export default Table;
