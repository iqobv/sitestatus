'use client';

import { sendGenerateRestoreTokenEmail } from '@/api';
import { Button } from '@/components/ui';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './UserDeletedError.module.scss';

interface UserDeletedErrorProps {
	email: string;
}

const UserDeletedError = ({ email }: UserDeletedErrorProps) => {
	const [isClicked, setIsClicked] = useState(false);

	const { mutate, isPending } = useMutation({
		mutationFn: () => sendGenerateRestoreTokenEmail(email),
		onSuccess: (data) => {
			toast.success(data.message || 'Restore email sent successfully');
			setIsClicked(true);
		},
	});

	const handleRestore = () => {
		if (isPending || isClicked) return;

		mutate();
	};

	return (
		<div className={styles.userDeletedError}>
			<p>
				Your account has been deleted. You can click button below to cancel
				deletion.
			</p>
			<Button
				variant="outlined"
				fullWidth
				onClick={handleRestore}
				disabled={isPending || isClicked}
			>
				Restore Account
			</Button>
		</div>
	);
};

export default UserDeletedError;
