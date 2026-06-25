'use client';

import { getAllProjectsWithMonitors } from '@/api/project/getAllProjectsWithMonitors.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useQuery } from '@tanstack/react-query';
import { StatusPageFormItemsAddProps } from '../StatusPageFormItemsAdd';
import styles from '../StatusPageFormItemsAdd.module.scss';
import { StatusPageFormItemsAddProjectsItem } from './StatusPageFormItemsAddProjectsItem';
import { StatusPageFormItemsAddProjectsLoader } from './StatusPageFormItemsAddProjectsLoader';

export const StatusPageFormItemsAddProjects = ({
	fields,
	handleAddMonitors,
}: StatusPageFormItemsAddProps) => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.projects.listWithMonitors(),
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
