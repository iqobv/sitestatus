'use client';

import { getProfile as apiGetProfile, logout as apiLogout } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useUserStore } from '@/store';
import { User } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useAuth = () => {
	const user = useUserStore((state) => state.user);
	const isLoading = useUserStore((state) => state.isLoading);
	const isAuthenticated = useUserStore((state) => state.isAuthenticated);

	const setUser = useUserStore((state) => state.setUser);
	const removeUser = useUserStore((state) => state.removeUser);
	const setIsLoading = useUserStore((state) => state.setIsLoading);
	const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);

	const login = (userData: User) => {
		setUser(userData);
		setIsAuthenticated(true);
		setIsLoading(false);
	};

	const storeLogout = () => {
		removeUser();
		setIsAuthenticated(false);
	};

	const { mutate: getProfile } = useMutation({
		mutationFn: apiGetProfile,
		mutationKey: QUERY_KEYS.auth.profile,
		onMutate: () => {
			setIsLoading(true);
		},
		onSuccess: (data) => {
			if (data?.id) {
				setUser(data);
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
				logout();
			}
			setIsLoading(false);
		},
		onError: () => {
			setIsAuthenticated(false);
			setIsLoading(false);
			logout();
		},
	});

	const { mutate: logout } = useMutation({
		mutationFn: () => apiLogout(),
		mutationKey: QUERY_KEYS.auth.logout,
		onMutate: () => {
			setIsLoading(true);
			storeLogout();
		},
		onSettled: () => {
			setIsLoading(false);
			window.location.reload();
		},
	});

	return {
		user,
		isLoading,
		isAuthenticated,
		setIsLoading,
		login,
		getProfile,
		logout,
	};
};
