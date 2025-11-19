import {
	getProfile as apiGetProfile,
	logout as apiLogout,
	refreshAuthToken,
} from '@/api';
import { QUERY_KEYS } from '@/config';
import { useTokenStore, useUserStore } from '@/store';
import { IUser } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
	const router = useRouter();

	const user = useUserStore((state) => state.user);
	const isLoading = useUserStore((state) => state.isLoading);
	const isAuthenticated = useUserStore((state) => state.isAuthenticated);
	const token = useTokenStore((state) => state.token);

	const setUser = useUserStore((state) => state.setUser);
	const removeUser = useUserStore((state) => state.removeUser);
	const setIsLoading = useUserStore((state) => state.setIsLoading);
	const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);

	const setToken = useTokenStore((state) => state.setToken);
	const resetToken = useTokenStore((state) => state.resetToken);

	const login = (userData: IUser, tokenData: string) => {
		setUser(userData);
		setToken(tokenData);
		setIsAuthenticated(true);
		setIsLoading(false);
	};

	const storeLogout = () => {
		removeUser();
		resetToken();
		setIsAuthenticated(false);
	};

	const { mutate: getProfile } = useMutation({
		mutationFn: (token: string) => apiGetProfile(token),
		mutationKey: QUERY_KEYS.auth.profile(token!),
		onSuccess: (data) => {
			if (data?.id) {
				setUser(data);
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
			setIsLoading(false);
		},
		onError: () => {
			setIsAuthenticated(false);
			setIsLoading(false);
		},
	});

	const { mutate: logout } = useMutation({
		mutationFn: () => apiLogout(token!),
		mutationKey: QUERY_KEYS.auth.logout,
		onSuccess: () => {
			storeLogout();
			setIsLoading(false);
			router.refresh();
		},
	});

	const { mutate: refresh } = useMutation({
		mutationFn: () => refreshAuthToken(token!),
		mutationKey: QUERY_KEYS.auth.refresh,
		onSuccess: (data) => {
			setToken(data.accessToken);
			getProfile(data.accessToken);
		},
		onError: () => {
			storeLogout();
			setIsAuthenticated(false);
			setIsLoading(false);
		},
	});

	return {
		user,
		token,
		isLoading,
		isAuthenticated,
		login,
		getProfile,
		refresh,
		logout,
	};
};
