'use client';

import { useRouter } from 'next/navigation';
import { MdOutlineArrowBack } from 'react-icons/md';
import Button from '../Button/Button';

const BackButton = () => {
	const router = useRouter();

	return (
		<Button onClick={() => router.back()} variant="text" size="sm">
			<MdOutlineArrowBack />
			Back
		</Button>
	);
};

export default BackButton;
