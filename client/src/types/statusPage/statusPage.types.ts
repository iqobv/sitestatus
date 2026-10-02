import { getStatusPageById } from '@/api/statusPage/getStatusPageById.api';
import { getUserStatusPages } from '@/api/statusPage/getUserStatusPages.api';

export type StatusPage = Awaited<
	ReturnType<typeof getUserStatusPages>
>['data'][number];

export type FullStatusPage = Awaited<ReturnType<typeof getStatusPageById>>;
