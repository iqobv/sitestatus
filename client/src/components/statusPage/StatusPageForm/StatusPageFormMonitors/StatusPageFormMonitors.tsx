'use client';

import { SectionHeader } from '@/components/ui';
import { BaseMonitor } from '@/types';
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	restrictToVerticalAxis,
	restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import {
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Control, useFieldArray } from 'react-hook-form';
import { StatusPageFormDto } from '../StatusPageForm';
import StatusPageFormItemsAdd from './StatusPageFormItemsAdd/StatusPageFormItemsAdd';
import styles from './StatusPageFormMonitors.module.scss';
import StatusPageFormMonitorsItem from './StatusPageFormMonitorsItem/StatusPageFormMonitorsItem';

interface StatusPageFormMonitorsProps {
	control: Control<StatusPageFormDto>;
}

const StatusPageFormMonitors = ({ control }: StatusPageFormMonitorsProps) => {
	const { fields, append, remove, move } = useFieldArray({
		control,
		name: 'monitors',
		keyName: '_rhfId',
	});

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = fields.findIndex((item) => item._rhfId === active.id);
			const newIndex = fields.findIndex((item) => item._rhfId === over.id);

			if (oldIndex !== -1 && newIndex !== -1) {
				move(oldIndex, newIndex);
			}
		}
	};

	const handleAddMonitors = (monitors: BaseMonitor | BaseMonitor[]) => {
		const monitorsArray = Array.isArray(monitors) ? monitors : [monitors];

		monitorsArray.forEach((monitor) => {
			append({
				id: monitor.id,
				displayName: null,
				sortOrder: fields.length,
				initMonitorName: monitor.name,
			});
		});
	};

	return (
		<div className={styles.monitorsWrapper}>
			<SectionHeader title="Monitors" titleComponent="h2" padding={0} />
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
			>
				<SortableContext
					items={fields.map((f) => f._rhfId)}
					strategy={verticalListSortingStrategy}
				>
					<div className={styles.monitorsList}>
						{fields.map((field, index) => (
							<StatusPageFormMonitorsItem
								key={field._rhfId}
								id={field._rhfId}
								index={index}
								onRemove={remove}
								initName={field.initMonitorName}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>
			<StatusPageFormItemsAdd
				fields={fields}
				handleAddMonitors={handleAddMonitors}
			/>
		</div>
	);
};

export default StatusPageFormMonitors;
