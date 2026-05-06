'use client';

import { flexRender, Header } from '@tanstack/react-table';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import styles from './TableHeaderCell.module.scss';

interface TableHeaderCellProps<T> {
	header: Header<T, unknown>;
}

const TableHeaderCell = <T,>({ header }: TableHeaderCellProps<T>) => {
	const meta = header.column.columnDef.meta;
	const columnSize = header.getSize();

	const cellClassNames = [styles.cell, meta?.className]
		.filter(Boolean)
		.join(' ')
		.trim();

	const innerClassNames = [
		styles.cellInner,
		header.column.getCanSort() ? styles.sortable : '',
		meta?.center && styles.center,
	]
		.filter(Boolean)
		.join(' ')
		.trim();

	return (
		<th
			colSpan={header.colSpan}
			className={cellClassNames}
			style={{
				width: columnSize || meta?.style?.width || undefined,
				minWidth:
					header.column.columnDef.minSize || meta?.style?.minWidth || undefined,
				maxWidth:
					header.column.columnDef.maxSize || meta?.style?.maxWidth || undefined,
				...meta?.style,
			}}
		>
			<div
				onClick={header.column.getToggleSortingHandler()}
				className={innerClassNames}
			>
				<p>{flexRender(header.column.columnDef.header, header.getContext())}</p>
				{header.column.getIsSorted() === 'asc' ? <TiArrowSortedUp /> : null}
				{header.column.getIsSorted() === 'desc' ? <TiArrowSortedDown /> : null}
			</div>
		</th>
	);
};

export default TableHeaderCell;
