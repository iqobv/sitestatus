'use client';

import { googleOneTapLogin } from '@/api/auth/googleOneTap.api';
import { env } from '@/env';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

type GoogleCredentialResponse = {
	credential: string;
};

export const useGoogleOneTap = () => {
	const { mutate: verifyCredential } = useMutation({
		mutationFn: (credential: string) => googleOneTapLogin(credential),
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
					client_id: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
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
