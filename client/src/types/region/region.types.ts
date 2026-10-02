import { getAllRegions } from '@/api/region/region.api';

export type Region = Awaited<ReturnType<typeof getAllRegions>>[number];
