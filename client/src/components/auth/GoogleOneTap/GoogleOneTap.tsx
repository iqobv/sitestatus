'use client';

import { useAuth } from '@/hooks';
import Script from 'next/script';
import { useGoogleOneTap } from './useGoogleOneTap.hook';

const GoogleOneTap = () => {
	const { user, isLoading: isAuthLoading } = useAuth();

	useGoogleOneTap();

	if (user || isAuthLoading) return null;

	return (
		<Script
			src="https://accounts.google.com/gsi/client"
			strategy="afterInteractive"
		/>
	);
};

export default GoogleOneTap;
