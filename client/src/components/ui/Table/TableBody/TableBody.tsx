'use client';

import { ColumnMeta, flexRender, RowData } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';
import { useTableContext } from '../TableContext';

interface TableRowData {
	isSkeleton?: boolean;
}

const TableBody = <D extends RowData>() => {
	const { table, getRowHref } = useTableContext();
	const columnsCount = table.getAllColumns().length;

	return (
		<tbody>
			{table.getRowModel().rows.map((row) => {
				const rowData = row.original as TableRowData;
				const isSkeleton = rowData.isSkeleton;
				const href = getRowHref ? getRowHref(row.original) : undefined;

				if (isSkeleton) {
					return (
						<tr key={row.id}>
							<td colSpan={columnsCount}>
								<div style={{ width: '100%' }}>
									{flexRender(
										row.getVisibleCells()[0].column.columnDef.cell,
										row.getVisibleCells()[0].getContext(),
									)}
								</div>
							</td>
						</tr>
					);
				}

				return (
					<tr key={row.id}>
						{row.getVisibleCells().map((cell) => {
							const { column } = cell;
							const meta = column.columnDef.meta as
								| ColumnMeta<D, unknown>
								| undefined;

							const cellStyle: React.CSSProperties = {
								width: cell.column.getSize() || meta?.style?.width,
								maxWidth:
									cell.column.columnDef.maxSize || meta?.style?.maxWidth,
								minWidth:
									cell.column.columnDef.minSize || meta?.style?.minWidth,
								...meta?.style,
							};

							const renderedCell = flexRender(
								cell.column.columnDef.cell,
								cell.getContext(),
							);

							return (
								<td
									key={cell.id}
									className={meta?.className || ''}
									style={cellStyle}
								>
									{href && !meta?.disableLink ? (
										<Link
											href={href}
											style={{
												display: 'block',
												width: '100%',
												height: '100%',
												textDecoration: 'none',
												color: 'inherit',
											}}
										>
											{renderedCell}
										</Link>
									) : (
										renderedCell
									)}
								</td>
							);
						})}
					</tr>
				);
			})}
		</tbody>
	);
};

export default TableBody;
