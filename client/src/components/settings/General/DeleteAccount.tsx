'use client';

import { Button, ConfirmAction } from '@/components/ui';
import { useAuth } from '@/hooks';

const DeleteAccount = () => {
	const { user } = useAuth();

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
			onConfirm={() => console.log('Account deleted')}
			confirmWithInput
			exceptedInputValue={user.email}
		/>
	);
};

export default DeleteAccount;
