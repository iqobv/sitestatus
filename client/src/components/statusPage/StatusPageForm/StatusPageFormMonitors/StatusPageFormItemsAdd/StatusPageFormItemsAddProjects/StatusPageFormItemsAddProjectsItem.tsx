'use client';

import { Button } from '@/components/ui';
import { ProjectWithMonitors } from '@/types';
import { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { StatusPageFormItemsAddProps } from '../StatusPageFormItemsAdd';
import styles from '../StatusPageFormItemsAdd.module.scss';

interface StatusPageFormItemsAddProjectsItemProps extends StatusPageFormItemsAddProps {
	project: ProjectWithMonitors;
}

const StatusPageFormItemsAddProjectsItem = ({
	project,
	fields,
	handleAddMonitors,
}: StatusPageFormItemsAddProjectsItemProps) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div>
			<div className={styles.item}>
				<p>{project.name}</p>
				<Button
					isIcon
					variant="text"
					onClick={() => setExpanded((prev) => !prev)}
					rounded
					size="sm"
				>
					<MdOutlineKeyboardArrowDown size={20} />
				</Button>
			</div>
			<div className={`${styles.monitors} ${expanded ? styles.expanded : ''}`}>
				{project.monitors.map((m) => {
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
		</div>
	);
};

export default StatusPageFormItemsAddProjectsItem;
