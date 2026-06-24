import { MonitorsQueryDto, ProjectsQueryDto } from '@/dto';
import { PaginationQueryDto } from '@/dto/ui.dto';

export const QUERY_KEYS = {
	auth: {
		profile: ['auth', 'profile'] as const,
		verifyEmail: (token: string) => ['auth', 'verifyEmail', { token }] as const,
		restoreAccount: (token: string) =>
			['auth', 'restoreAccount', { token }] as const,
	},
	monitors: {
		all: ['monitors'] as const,
		lists: () => ['monitors', 'list'] as const,
		list: (query?: MonitorsQueryDto) => ['monitors', 'list', query] as const,
		paginatedList: (query?: PaginationQueryDto) =>
			['monitors', 'list', { paginated: true }, query] as const,
		byProjectBase: (projectId: string) =>
			['monitors', 'list', { projectId }] as const,
		byProject: (projectId: string, query?: MonitorsQueryDto) =>
			['monitors', 'list', { projectId }, query] as const,
		details: () => ['monitors', 'detail'] as const,
		detail: (id?: string) => ['monitors', 'detail', id] as const,
		detailFull: (id?: string) => ['monitors', 'detail', id, 'full'] as const,
		analytics: (id: string, range: number, region: string) =>
			['monitors', 'detail', id, 'analytics', { range, region }] as const,
		incident: (monitorId: string, incidentId: string) =>
			['monitors', 'detail', monitorId, 'incidents', incidentId] as const,
	},
	regions: {
		all: ['regions'] as const,
		lists: () => ['regions', 'list'] as const,
	},
	projects: {
		all: ['projects'] as const,
		lists: () => ['projects', 'list'] as const,
		list: (query?: ProjectsQueryDto) => ['projects', 'list', query] as const,
		listWithMonitors: () =>
			['projects', 'list', { include: 'monitors' }] as const,
		infinite: () => ['projects', 'infinite'] as const,
		details: () => ['projects', 'detail'] as const,
		detail: (id: string) => ['projects', 'detail', id] as const,
		detailBySlug: (slug: string) => ['projects', 'detail', { slug }] as const,
	},
	sessions: {
		all: ['sessions'] as const,
		lists: () => ['sessions', 'list'] as const,
	},
	notificationChannels: {
		all: ['notificationChannels'] as const,
		lists: () => ['notificationChannels', 'list'] as const,
	},
	alertSettings: {
		all: ['alertSettings'] as const,
		hierarchy: (id?: string) => ['alertSettings', 'hierarchy', id] as const,
	},
	statusPages: {
		all: ['statusPages'] as const,
		lists: () => ['statusPages', 'list'] as const,
		details: () => ['statusPages', 'detail'] as const,
		detail: (id: string) => ['statusPages', 'detail', id] as const,
		detailBySlug: (slug: string) =>
			['statusPages', 'detail', { slug }] as const,
		monitors: (slug: string) =>
			['statusPages', 'detail', { slug }, 'monitors'] as const,
	},
	notifications: {
		all: ['notifications'] as const,
		lists: () => ['notifications', 'list'] as const,
	},
	dashboard: {
		base: ['dashboard'] as const,
	},
} as const;
