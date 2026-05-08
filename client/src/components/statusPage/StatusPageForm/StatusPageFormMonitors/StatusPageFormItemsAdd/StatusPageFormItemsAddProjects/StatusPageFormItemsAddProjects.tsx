'use client';

import { getAllProjectsWithMonitors } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { StatusPageFormItemsAddProps } from '../StatusPageFormItemsAdd';
import styles from '../StatusPageFormItemsAdd.module.scss';
import StatusPageFormItemsAddProjectsItem from './StatusPageFormItemsAddProjectsItem';
import StatusPageFormItemsAddProjectsLoader from './StatusPageFormItemsAddProjectsLoader';

const StatusPageFormItemsAddProjects = ({
	fields,
	handleAddMonitors,
}: StatusPageFormItemsAddProps) => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.project.allWithMonitors,
		queryFn: getAllProjectsWithMonitors,
	});

	if (isLoading) return <StatusPageFormItemsAddProjectsLoader />;
	if (!data) return null;

	return (
		<div className={styles.list}>
			{data.map((p) => (
				<StatusPageFormItemsAddProjectsItem
					key={p.id}
					project={p}
					fields={fields}
					handleAddMonitors={handleAddMonitors}
				/>
			))}
		</div>
	);
};

export default StatusPageFormItemsAddProjects;
