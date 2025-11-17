'use client';

import { verifyEmail } from '@/api';
import { PAGES, QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface EmailVerificationProps {
	userId: string;
	token: string;
}

const EmailVerification = ({ userId, token }: EmailVerificationProps) => {
	const router = useRouter();

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: QUERY_KEYS.auth.verifyEmail(userId, token),
		queryFn: () => verifyEmail(userId, token),
		enabled: !!userId && !!token,
	});

	useEffect(() => {
		if (!isLoading && isSuccess) router.push(PAGES.home);
	}, [isLoading, isSuccess, router]);

	return (
		<div>
			{isLoading && <p>Verifying your email...</p>}
			{data && isSuccess && <p>{data.message}</p>}
		</div>
	);
};

export default EmailVerification;
