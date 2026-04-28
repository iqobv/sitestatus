'use client';

import { PRIVATE_PAGES } from '@/config';
import { useRouter } from 'next/navigation';

export const useLoginWindow = (url: string) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const apiOrigin = apiUrl ? new URL(apiUrl).origin : null;

	const router = useRouter();

	const handleOpen = () => {
		if (!apiUrl || !apiOrigin) {
			return;
		}

		const width = 600;
		const height = 800;

		const left = (window.screen.width - width) / 2;
		const top = (window.screen.height - height) / 2 - 50;

		const loginWindow = window.open(
			`${apiUrl}${url}`,
			'_blank',
			`width=${width},height=${height},top=${top},left=${left}`,
		);

		const messageListener = (event: MessageEvent) => {
			if (event.origin !== apiOrigin) {
				return;
			}

			if (event.data?.success) {
				window.removeEventListener('message', messageListener);
				router.push(PRIVATE_PAGES.DASHBOARD);
				router.refresh();
			}
		};

		window.addEventListener('message', messageListener);
		loginWindow?.focus();
	};

	return { handleOpen };
};
