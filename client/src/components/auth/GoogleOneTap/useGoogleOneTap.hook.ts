'use client';

import { googleOneTapLogin } from '@/api';
import { PRIVATE_PAGES } from '@/config';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type GoogleCredentialResponse = {
	credential: string;
};

export const useGoogleOneTap = () => {
	const router = useRouter();

	const { mutate: verifyCredential } = useMutation({
		mutationFn: (credential: string) => googleOneTapLogin(credential),
		onSuccess: () => {
			router.push(PRIVATE_PAGES.DASHBOARD);
			router.refresh();
		},
	});

	useEffect(() => {
		const handleCredentialResponse = (
			response: GoogleCredentialResponse,
		): void => {
			verifyCredential(response.credential);
		};

		const initializeGoogleOneTap = (): void => {
			if (typeof window !== 'undefined' && window.google) {
				window.google.accounts.id.initialize({
					client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
					callback: handleCredentialResponse,
					auto_select: true,
					cancel_on_tap_outside: true,
					use_fedcm_for_prompt: true,
				});
				window.google.accounts.id.prompt();
			}
		};

		const timeoutId = setTimeout(initializeGoogleOneTap, 500);

		return () => {
			clearTimeout(timeoutId);
			if (typeof window !== 'undefined' && window.google) {
				window.google.accounts.id.cancel();
			}
		};
	}, [verifyCredential]);
};
