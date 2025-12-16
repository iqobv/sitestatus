'use client';

import { useAuth } from '@/hooks';
import { IUser } from '@/types';
import { useEffect } from 'react';

interface AuthProviderProps {
	children: React.ReactNode;
	user: IUser | null;
}

export default function AuthProvider({ children, user }: AuthProviderProps) {
	const { login } = useAuth();

	useEffect(() => {
		if (user) login(user);
	}, [login, user]);

	return <>{children}</>;
}
