'use client';

import dynamic from 'next/dynamic';

const UpdateMonitorFormModal = dynamic(
	() =>
		import('@/components/monitors').then((mod) => mod.UpdateMonitorFormModal),
	{ ssr: false },
);

export default function UpdateMonitorModalPage() {
	return <UpdateMonitorFormModal />;
}
