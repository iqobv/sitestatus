'use client';

import { FaGoogle } from 'react-icons/fa6';
import ButtonWrapper from '../ButtonWrapper/ButtonWrapper';
import { useLoginWindow } from '../useLoginWindow';

const Google = () => {
	const { handleOpen } = useLoginWindow('/api/v1/oauth/google');

	return (
		<ButtonWrapper onClick={handleOpen}>
			<FaGoogle size={20} />
			Sign in with Google
		</ButtonWrapper>
	);
};

export default Google;
