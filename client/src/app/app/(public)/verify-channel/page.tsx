export const dynamic = 'force-dynamic';

import { verifyNotificationChannel } from '@/api/notificationChannel/verifyNotificationChannel.api';
import { NotificationChannelsVerifyError } from '@/components/settings/Alerting/NotificationChannels/NotificationChannelsVerify/NotificationChannelsVerifyError';
import { NotificationChannelsVerifySuccess } from '@/components/settings/Alerting/NotificationChannels/NotificationChannelsVerify/NotificationChannelsVerifySuccess';
import { PUBLIC_PAGES } from '@/config/publicPages.config';

interface VerifyNotificationChannelPageProps {
	searchParams: Promise<{ token?: string }>;
}

export default async function VerifyNotificationChannelPage({
	searchParams,
}: VerifyNotificationChannelPageProps) {
	const { token } = await searchParams;

	if (!token) {
		return (
			<NotificationChannelsVerifyError
				title="Error during verification"
				message="Token not found in URL"
				href={PUBLIC_PAGES.HOME}
				hrefText="Go back to home"
			/>
		);
	}

	let isSuccess = false;
	let errorMessage = '';

	try {
		await verifyNotificationChannel(token);
		isSuccess = true;
	} catch (error) {
		isSuccess = false;
		errorMessage = error instanceof Error ? error.message : 'Unknown Error';
	}

	return (
		<>
			{isSuccess ? (
				<NotificationChannelsVerifySuccess />
			) : (
				<NotificationChannelsVerifyError
					title="Error during verification"
					message={errorMessage || 'Unknown Error'}
					href={PUBLIC_PAGES.HOME}
					hrefText="Go back to home"
				/>
			)}
		</>
	);
}
