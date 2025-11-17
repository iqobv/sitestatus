import { Register } from '@/components/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign Up',
	description: 'Create a new account to monitor your services.',
};

export default function SignUpPage() {
	return (
		<div>
			<Register />
		</div>
	);
}
