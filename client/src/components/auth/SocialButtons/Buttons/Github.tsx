'use client';

import { FaGithub } from 'react-icons/fa6';
import ButtonWrapper from '../ButtonWrapper/ButtonWrapper';
import { useLoginWindow } from '../useLoginWindow';

const Github = () => {
	const { handleOpen } = useLoginWindow('/v1/oauth/github');

	return (
		<ButtonWrapper onClick={handleOpen}>
			<FaGithub size={20} />
			Sign in with Github
		</ButtonWrapper>
	);
};

export default Github;
