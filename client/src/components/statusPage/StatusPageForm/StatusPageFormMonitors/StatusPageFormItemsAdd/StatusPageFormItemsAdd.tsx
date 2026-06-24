'use client';

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalTrigger,
} from '@/components/ui';
import { BaseMonitor } from '@/types/monitors/monitor.types';
import { useState } from 'react';
import { FieldArrayWithId } from 'react-hook-form';
import { StatusPageFormDto } from '../../StatusPageForm';
import styles from './StatusPageFormItemsAdd.module.scss';
import { StatusPageFormItemsAddMonitors } from './StatusPageFormItemsAddMonitors/StatusPageFormItemsAddMonitors';
import { StatusPageFormItemsAddProjects } from './StatusPageFormItemsAddProjects/StatusPageFormItemsAddProjects';
import { STATUS_PAGE_FORM_ADD_TABS } from './statusPageFormItemsAddTabs';

export type Tab = 'monitors' | 'projects';

export type Fields = FieldArrayWithId<
	StatusPageFormDto,
	'monitors',
	'_rhfId'
>[];

export interface StatusPageDetailsFormMonitorsAddProps {
	fields: Fields;
	handleAddMonitors: (monitors: BaseMonitor | BaseMonitor[]) => void;
}

export interface StatusPageFormItemsAddProps {
	fields: Fields;
	handleAddMonitors: (monitors: BaseMonitor | BaseMonitor[]) => void;
}

export const StatusPageFormItemsAdd = ({
	fields,
	handleAddMonitors,
}: StatusPageFormItemsAddProps) => {
	const [selectedTab, setSelectedTab] = useState<Tab>('monitors');

	const handleTabChange = (tab: Tab) => {
		setSelectedTab(tab);
	};

	return (
		<Modal>
			<ModalTrigger>
				<Button variant="secondary">Add Monitor</Button>
			</ModalTrigger>
			<ModalContent>
				<ModalHeader>Add Monitor</ModalHeader>
				<ModalBody>
					<div className={styles.tabs}>
						{STATUS_PAGE_FORM_ADD_TABS.map((tab) => (
							<Button
								key={tab.id}
								variant={selectedTab === tab.id ? 'contained' : 'text'}
								onClick={() => handleTabChange(tab.id)}
							>
								{tab.label}
							</Button>
						))}
					</div>
					{selectedTab === 'monitors' && (
						<StatusPageFormItemsAddMonitors
							fields={fields}
							handleAddMonitors={handleAddMonitors}
						/>
					)}
					{selectedTab === 'projects' && (
						<StatusPageFormItemsAddProjects
							fields={fields}
							handleAddMonitors={handleAddMonitors}
						/>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
