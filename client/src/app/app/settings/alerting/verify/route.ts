import { verifyNotificationChannel } from '@/api';
import { PRIVATE_PAGES } from '@/config';
import { redirect, RedirectType } from 'next/navigation';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const token = searchParams.get('token');

	if (!token) {
		redirect(
			`${PRIVATE_PAGES.SETTINGS.ALERTING}?verificationStatus=error`,
			RedirectType.replace,
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

	if (isSuccess) {
		redirect(
			`${PRIVATE_PAGES.SETTINGS.ALERTING}?verificationStatus=success`,
			RedirectType.replace,
		);
	} else {
		const encodedMessage = encodeURIComponent(errorMessage);
		redirect(
			`${PRIVATE_PAGES.SETTINGS.ALERTING}?verificationStatus=error&message=${encodedMessage}`,
			RedirectType.replace,
		);
	}
}
