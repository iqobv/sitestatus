'use client';

import { useAuth } from '@/hooks';
import { PropsWithChildren, useEffect } from 'react';

export default function AuthProvider({ children }: PropsWithChildren<unknown>) {
	const { refresh } = useAuth();

	useEffect(() => {
		refresh();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{children}</>;
}
