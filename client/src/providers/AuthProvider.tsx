'use client';

import { useAuth } from '@/hooks';
import { User } from '@/types';
import { useEffect } from 'react';

interface AuthProviderProps {
	children: React.ReactNode;
	user: User | null;
}

export default function AuthProvider({ children, user }: AuthProviderProps) {
	const { login, setIsLoading } = useAuth();

	useEffect(() => {
		setIsLoading(true);
		if (user) {
			login(user);
		} else {
			setIsLoading(false);
		}
	}, [login, user, setIsLoading]);

	return <>{children}</>;
}
