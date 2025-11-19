'use client';

import { resendVerificationEmail } from '@/api';
import { Button, SectionHeader } from '@/components/ui';
import { PAGES, QUERY_KEYS } from '@/config';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import styles from './EmailVerification.module.scss';
import EmailVerificationWrapper from './EmailVerificationWrapper';

const EmailVerificationWait = () => {
	const [email, setEmail] = useState<string | null>(
		localStorage.getItem('registrationEmail') || ''
	);
	const [timer, setTimer] = useState(0);

	const { mutate } = useMutation({
		mutationFn: () => resendVerificationEmail(email!),
		mutationKey: QUERY_KEYS.auth.resendVerificationEmail(email!),
		onSuccess: (data) => {
			toast.info(data.message);
		},
	});

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (timer > 0) {
			interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
		}

		return () => clearInterval(interval);
	}, [timer]);

	const handleChangeEmail = () => {
		localStorage.removeItem('registrationEmail');
		setEmail(null);
	};

	const handleResendEmail = () => {
		if (email) mutate();
		setTimer(30);
	};

	return (
		<EmailVerificationWrapper>
			<div className={styles['email-verification__wait']}>
				<SectionHeader
					title="Your Email is not Verified!"
					description={`Your email ${
						email ? `"${email}"` : ''
					} is not verified. Please check your inbox for a verification email. If you did not receive the email, you can resend the verification email or change your email address.`}
				/>
				<Button
					href="https://mail.google.com"
					target="_blank"
					variant="outlined"
				>
					Gmail <FaExternalLinkAlt size={15} />
				</Button>
				<Button onClick={handleResendEmail} disabled={timer > 0}>
					{timer > 0
						? `Resend Verification Email (${timer})`
						: 'Resend Verification Email'}
				</Button>
				<Button onClick={handleChangeEmail} href={PAGES.signUp}>
					Change Email
				</Button>
			</div>
		</EmailVerificationWrapper>
	);
};

export default EmailVerificationWait;
