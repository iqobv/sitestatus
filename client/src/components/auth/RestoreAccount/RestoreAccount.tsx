'use client';

import { restoreAccount } from '@/api/auth/restoreAccount.api';
import { AUTH_PAGES } from '@/config/authPages.config';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { parseAsString, useQueryState } from 'nuqs';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const RestoreAccount = () => {
	const router = useRouter();

	const [token, setToken] = useQueryState('token', parseAsString);

	const { mutate, isPending } = useMutation({
		mutationFn: () => restoreAccount(token!),
		onSuccess: () => {
			setToken(null);
			router.push(AUTH_PAGES.LOGIN);
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to restore account');
			setToken(null);
			router.push(AUTH_PAGES.LOGIN);
		},
	});

	useEffect(() => {
		if (token) {
			mutate();
		} else {
			setToken(null);
			router.refresh();
			router.push(AUTH_PAGES.LOGIN);
		}
	}, [token, mutate, router]);

	return (
		<div style={{ textAlign: 'center' }}>
			{isPending ? 'Restoring account...' : 'Redirecting...'}
		</div>
	);
};
