'use client';

import { flexRender } from '@tanstack/react-table';
import { useTableContext } from '../TableContext';

const TableBody = () => {
	const { table } = useTableContext();
	const columnsCount = table.getAllColumns().length;

	return (
		<tbody>
			{table.getRowModel().rows.map((row) => {
				const isSkeleton = (row.original as { isSkeleton?: boolean })
					.isSkeleton;

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
							const meta = column.columnDef.meta;

							return (
								<td
									key={cell.id}
									className={meta?.className || ''}
									style={{
										width: cell.column.getSize() || meta?.style?.width,
										maxWidth:
											cell.column.columnDef.maxSize || meta?.style?.maxWidth,
										minWidth:
											cell.column.columnDef.minSize || meta?.style?.minWidth,
										...meta?.style,
									}}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
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
