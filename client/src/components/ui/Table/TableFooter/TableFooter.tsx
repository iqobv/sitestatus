'use client';

import { flexRender } from '@tanstack/react-table';
import { useTableContext } from '../TableContext';
import styles from './TableFooter.module.scss';

const TableFooter = () => {
	const { table } = useTableContext();

	return (
		<tfoot className={styles.tableFooter}>
			{table.getFooterGroups().map((footerGroup) => (
				<tr
					key={footerGroup.id}
					className={styles.row}
				>
					{footerGroup.headers.map((header) => (
						<th
							key={header.id}
							colSpan={header.colSpan}
						>
							{header.isPlaceholder
								? null
								: flexRender(
										header.column.columnDef.footer,
										header.getContext(),
									)}
						</th>
					))}
				</tr>
			))}
		</tfoot>
	);
};

export default TableFooter;
