'use client';

import { getAllMonitors } from '@/api';
import { Button } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { StatusPageFormItemsAddProps } from '../StatusPageFormItemsAdd';
import styles from '../StatusPageFormItemsAdd.module.scss';
import StatusPageFormItemsAddMonitorsLoader from './StatusPageFormItemsAddMonitorsLoader';

const StatusPageFormItemsAddMonitors = ({
	fields,
	handleAddMonitors,
}: StatusPageFormItemsAddProps) => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.monitors.list,
		queryFn: getAllMonitors,
	});

	if (isLoading) return <StatusPageFormItemsAddMonitorsLoader />;
	if (!data) return null;

	return (
		<div className={styles.list}>
			{data.map((m) => {
				const alreadyAdded = fields.some((f) => f.id === m.id);

				return (
					<div key={m.id} className={styles.item}>
						<p>{m.name}</p>
						<Button
							onClick={() => !alreadyAdded && handleAddMonitors(m)}
							disabled={alreadyAdded}
						>
							Add
						</Button>
					</div>
				);
			})}
		</div>
	);
};

export default StatusPageFormItemsAddMonitors;
