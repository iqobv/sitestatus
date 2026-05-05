'use client';

import { resendVerificationNotificationChannel } from '@/api';
import { Button } from '@/components/ui';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface NotificationChannelsItemResendProps {
	id: string;
}

const NotificationChannelsItemResend = ({
	id,
}: NotificationChannelsItemResendProps) => {
	const { mutate, isPending } = useMutation({
		mutationFn: () => resendVerificationNotificationChannel(id),
		onSuccess: (data) => {
			toast.success(data.message || 'Verification email resent successfully');
		},
		onError: (e) => {
			toast.error(e.message || 'Failed to resend verification email');
		},
	});

	return (
		<Button variant="outlined" onClick={() => mutate()} disabled={isPending}>
			Resend
		</Button>
	);
};

export default NotificationChannelsItemResend;
