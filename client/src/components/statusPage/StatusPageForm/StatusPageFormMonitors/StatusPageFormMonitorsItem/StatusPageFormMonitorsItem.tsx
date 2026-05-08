'use client';

import { Button, Form, TextField } from '@/components/ui';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MdDeleteOutline, MdOutlineDragIndicator } from 'react-icons/md';
import styles from './StatusPageFormMonitorsItem.module.scss';

interface StatusPageFormMonitorsItemProps {
	id: string;
	index: number;
	initName: string;
	onRemove: (index: number) => void;
}

const StatusPageFormMonitorsItem = ({
	id,
	index,
	initName,
	onRemove,
}: StatusPageFormMonitorsItemProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div ref={setNodeRef} style={style} className={styles.monitorItem}>
			<div className={styles.dragHandle} {...attributes} {...listeners}>
				<MdOutlineDragIndicator size={20} />
			</div>
			<div className={styles.inputWrapper}>
				<Form.Field name={`monitors.${index}.displayName`}>
					<TextField className={styles.textField} placeholder={initName} />
				</Form.Field>
			</div>
			<Button
				type="button"
				onClick={() => onRemove(index)}
				className={styles.removeBtn}
				variant="outlined"
				isIcon
				size="sm"
			>
				<MdDeleteOutline size={20} />
			</Button>
		</div>
	);
};

export default StatusPageFormMonitorsItem;
