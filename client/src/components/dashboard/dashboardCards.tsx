import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { Dashboard } from '@/types/dashboard/dashboard.types';
import { MdMonitor } from 'react-icons/md';
import { MonitorIncidentStatus } from '../monitors/Monitor/MonitorIncidents/MonitorIncidentStatus/MonitorIncidentStatus';
import { DashboardSectionProps } from './DashboardSection/DashboardSection';

export const DASHBOARD_CARDS = (data: Dashboard): DashboardSectionProps[] => [
	{
		title: 'Monitors',
		items: data.monitors.map((monitor) => ({
			title: monitor.name,
			href: PRIVATE_PAGES.MONITORS.ONE(monitor.id),
		})),
		emptyIcon: MdMonitor,
		emptyText: 'No Monitors',
		href: PRIVATE_PAGES.MONITORS.ALL,
		createButtonText: 'Create Monitor',
		createHref: PRIVATE_PAGES.MONITORS.NEW,
		description: 'View and manage your monitors',
	},
	{
		title: 'Incidents',
		items: data.incidents.map((incident) => ({
			title: (
				<>
					<MonitorIncidentStatus
						isResolved={incident.resolved}
						showText={false}
					/>{' '}
					{incident.statusCode}
					{incident.monitor ? ` in ${incident.monitor.name} monitor` : ''}
				</>
			),
			href: PRIVATE_PAGES.MONITORS.INCIDENT(incident.monitorId, incident.id),
		})),
		emptyIcon: MdMonitor,
		emptyText: 'No Incidents',
		description: 'View and manage your incidents',
	},
	{
		title: 'Status Pages',
		items: data.statusPages.map((statusPage) => ({
			title: statusPage.title,
			href: PRIVATE_PAGES.STATUS_PAGES.ID(statusPage.id),
		})),
		emptyIcon: MdMonitor,
		emptyText: 'No Status Pages',
		description: 'View and manage your status pages',
		createButtonText: 'Create Status Page',
		createHref: PRIVATE_PAGES.STATUS_PAGES.NEW,
		href: PRIVATE_PAGES.STATUS_PAGES.ALL,
	},
	{
		title: 'Projects',
		items: data.projects.map((project) => ({
			title: project.name,
			href: PRIVATE_PAGES.PROJECTS.ID(project.id),
		})),
		emptyIcon: MdMonitor,
		emptyText: 'No Projects',
		description: 'View and manage your projects',
		createButtonText: 'Create Project',
		createHref: PRIVATE_PAGES.PROJECTS.NEW,
		href: PRIVATE_PAGES.PROJECTS.ALL,
	},
];
