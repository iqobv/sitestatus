'use client';

import { useAuth } from '@/hooks/useAuth.hook';
import { useMounted } from '@/hooks/useMounted.hook';
import Script from 'next/script';
import { useGoogleOneTap } from './useGoogleOneTap.hook';

export const GoogleOneTap = () => {
	const mounted = useMounted();
	const { user, isLoading: isAuthLoading } = useAuth();

	useGoogleOneTap();

	if (!mounted || user || isAuthLoading) return null;

	return (
		<Script
			src="https://accounts.google.com/gsi/client"
			strategy="afterInteractive"
		/>
	);
};
