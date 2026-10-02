import { getDashboard } from '@/api/dashboard/dashboard.api';

export type Dashboard = Awaited<ReturnType<typeof getDashboard>>;
