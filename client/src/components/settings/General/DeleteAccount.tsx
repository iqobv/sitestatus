'use client';

import { deleteAccount } from '@/api';
import { Button, ConfirmAction } from '@/components/ui';
import { useAuth } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const DeleteAccount = () => {
	const router = useRouter();

	const { user } = useAuth();

	const { mutate } = useMutation({
		mutationFn: deleteAccount,
		onSuccess: () => {
			router.refresh();
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to delete account');
			router.refresh();
		},
	});

	if (!user) return null;

	return (
		<ConfirmAction
			title="Delete Account"
			description="Are you sure you want to delete your account? You will lose all your data. You will have 7 days to recover your account after deletion. After that, all your data will be permanently deleted."
			confirmButtonText="Delete"
			trigger={
				<Button variant="danger" fullWidth>
					Delete
				</Button>
			}
			onConfirm={() => mutate()}
			confirmWithInput
			exceptedInputValue={user.email}
		/>
	);
};

export default DeleteAccount;
