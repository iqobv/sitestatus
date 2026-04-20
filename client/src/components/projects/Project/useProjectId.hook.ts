'use client';

import { useParams } from 'next/navigation';

export const useProjectId = () => {
	const { id } = useParams<{ id: string }>();

	return { id };
};
