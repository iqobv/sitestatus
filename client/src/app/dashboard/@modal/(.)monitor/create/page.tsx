'use client';

import dynamic from 'next/dynamic';

const CreateMonitorFormModal = dynamic(
	() =>
		import('@/components/monitors').then((mod) => mod.CreateMonitorFormModal),
	{ ssr: false },
);

export default function CreateMonitorModalPage() {
	return <CreateMonitorFormModal />;
}
