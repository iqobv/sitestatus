'use client';

import { verifyEmail } from '@/api';
import { PAGES, QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import EmailVerificationWait from './EmailVerificationWait';
import EmailVerificationWrapper from './EmailVerificationWrapper';

interface EmailVerificationProps {
	userId?: string;
	token?: string;
}

const EmailVerification = ({ userId, token }: EmailVerificationProps) => {
	const [loginCompleted, setLoginCompleted] = useState(false);

	const { login } = useAuth();

	const router = useRouter();

	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: QUERY_KEYS.auth.verifyEmail(userId!, token!),
		queryFn: () => verifyEmail(userId!, token!),
		enabled: !!userId && !!token && !loginCompleted,
		retry: false,
	});

	useEffect(() => {
		if (isSuccess && data && !loginCompleted) {
			const { accessToken, user, message } = data;

			if (message === 'Email verified successfully' && accessToken && user) {
				login(user, accessToken);
				// eslint-disable-next-line react-hooks/set-state-in-effect
				setLoginCompleted(true);
				router.push(PAGES.dashboard);
			}
		}
	}, [isSuccess, data, login, router, loginCompleted]);

	useEffect(() => {
		if (error) {
			toast.error(error.message);
			router.push(PAGES.verifyEmail);
		}
	}, [error, router]);

	if (!userId && !token) return <EmailVerificationWait />;

	return (
		<EmailVerificationWrapper>
			{isLoading && <p>Verifying your email...</p>}
			{data && isSuccess && <p>{data.message}</p>}
		</EmailVerificationWrapper>
	);
};

export default EmailVerification;
