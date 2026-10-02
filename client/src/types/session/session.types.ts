import { getAllSessions } from '@/api/session/getAll.api';

export type Session = Awaited<
	ReturnType<typeof getAllSessions>
>['otherSessions'][number];
