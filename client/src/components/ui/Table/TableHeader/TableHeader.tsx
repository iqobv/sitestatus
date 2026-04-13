'use client';

import { useTableContext } from '../TableContext';
import styles from './TableHeader.module.scss';
import TableHeaderCell from './TableHeaderCell/TableHeaderCell';

const TableHeader = () => {
	const { table } = useTableContext();

	return (
		<thead className={styles['table-header']}>
			{table.getHeaderGroups().map((headerGroup) => (
				<tr
					key={headerGroup.id}
					className={styles['table-header__row']}
				>
					{headerGroup.headers.map((header) => (
						<TableHeaderCell
							key={header.id}
							header={header}
						/>
					))}
				</tr>
			))}
		</thead>
	);
};

export default TableHeader;
