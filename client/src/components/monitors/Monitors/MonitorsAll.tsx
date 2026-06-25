'use client';

import { getAllMonitors } from '@/api/monitor/getAllMonitors.api';
import { IconButton, SectionHeader } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { FiPlus } from 'react-icons/fi';
import { Monitors } from './Monitors';

export const MonitorsAll = () => {
	return (
		<>
			<SectionHeader
				title="Monitors"
				description="View and manage your monitors"
				rightSlot={
					<IconButton Icon={FiPlus} href={PRIVATE_PAGES.MONITORS.NEW}>
						Add New Monitor
					</IconButton>
				}
			/>
			<Monitors
				queryKeyBase={QUERY_KEYS.monitors.lists()}
				queryKeyFactory={(params) => QUERY_KEYS.monitors.list(params)}
				fetcher={getAllMonitors}
			/>
		</>
	);
};
