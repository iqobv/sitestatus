'use client';

import { getCoreRowModel } from '@tanstack/react-table';
import { useMemo } from 'react';
import { SkeletonLoader } from '../../SkeletonLoader/SkeletonLoader';
import { Table } from '../Table';
import { TableLoaderProps } from './TableLoader.types';

export const TableLoader = <T,>({
	columns,
	countRows = 10,
}: TableLoaderProps<T>) => {
	const skeletonColumns = useMemo(
		() =>
			columns.map((column) => ({
				...column,
				cell: () => <SkeletonLoader height={32} />,
				enableSorting: false,
			})),
		[columns],
	);

	const data = useMemo(
		() =>
			Array.from({ length: countRows }).map(
				(_, index) => ({ id: `skeleton-${index}` }) as unknown as T,
			),
		[countRows],
	);

	return (
		<Table
			columns={skeletonColumns}
			data={data}
			getCoreRowModel={getCoreRowModel()}
		/>
	);
};
