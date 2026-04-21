'use client';

import { resendVerificationEmail } from '@/api';
import { Button } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import styles from './VerifyEmailButton.module.scss';

interface VerifyEmailButtonProps {
	email: string;
}

const VerifyEmailButton = ({ email }: VerifyEmailButtonProps) => {
	const { mutate } = useMutation({
		mutationFn: () => resendVerificationEmail(email),
		mutationKey: QUERY_KEYS.auth.resendVerificationEmail(email),
		onSuccess: (data) => {
			toast.info(data.message);
		},
	});

	return (
		<div className={styles.unverified}>
			<span>Please verify your email address to continue.</span>
			<Button size="sm" variant="link" onClick={() => mutate()}>
				Verify
			</Button>
		</div>
	);
};

export default VerifyEmailButton;
