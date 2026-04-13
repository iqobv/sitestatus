import { User } from '@/types';
import { create } from 'zustand';

interface UserState {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
}

interface UserActions {
	setIsLoading: (isLoading: boolean) => void;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	setUser: (user: User | null) => void;
	removeUser: () => void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	isLoading: true,
	isAuthenticated: false,
	setIsLoading: (isLoading) => set({ isLoading }),
	setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
	setUser: (user) => set({ user }),
	removeUser: () =>
		set({ user: null, isAuthenticated: false, isLoading: false }),
}));
