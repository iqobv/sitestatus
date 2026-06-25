'use client';

import { useAuth } from '@/hooks/useAuth.hook';
import { User } from '@/types/user/user.types';
import { useEffect } from 'react';

interface AuthProviderProps {
	children: React.ReactNode;
	user: User | null;
}

export const AuthProvider = ({ children, user }: AuthProviderProps) => {
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
};
