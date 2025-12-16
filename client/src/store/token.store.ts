import { create } from 'zustand';

interface TokenState {
	token: string | null;
}

interface TokenActions {
	setToken: (token: string | null) => void;
	resetToken: () => void;
}

type TokenStore = TokenState & TokenActions;

export const useTokenStore = create<TokenStore>((set) => ({
	token: null,
	setToken: (token) => set({ token }),
	resetToken: () => set({ token: null }),
}));
