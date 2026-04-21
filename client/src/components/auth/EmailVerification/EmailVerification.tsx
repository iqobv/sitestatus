'use client';

import { verifyEmail } from '@/api';
import { AUTH_PAGES, PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import EmailVerificationWait from './EmailVerificationWait';
import EmailVerificationWrapper from './EmailVerificationWrapper';

interface EmailVerificationProps {
	token?: string;
}

const EmailVerification = ({ token }: EmailVerificationProps) => {
	const [loginCompleted, setLoginCompleted] = useState(false);

	const { login } = useAuth();

	const router = useRouter();

	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: QUERY_KEYS.auth.verifyEmail(token!),
		queryFn: () => verifyEmail(token!),
		enabled: !!token && !loginCompleted,
		retry: false,
	});

	useEffect(() => {
		if (isSuccess && data && !loginCompleted) {
			const { user, message } = data;

			if (message === 'Email verified successfully' && user) {
				login(user);
				// eslint-disable-next-line react-hooks/set-state-in-effect
				setLoginCompleted(true);
				router.push(PRIVATE_PAGES.DASHBOARD);
			}
		}
	}, [isSuccess, data, login, router, loginCompleted]);

	useEffect(() => {
		if (error) {
			if (isAxiosError(error) && error.response) {
				toast.error(error.response.data.message);
			}
			router.push(AUTH_PAGES.VERIFY_EMAIL);
		}
	}, [error, router]);

	if (!token) return <EmailVerificationWait />;

	return (
		<EmailVerificationWrapper>
			{isLoading && <p>Verifying your email...</p>}
			{data && isSuccess && <p>{data.message}</p>}
		</EmailVerificationWrapper>
	);
};

export default EmailVerification;
