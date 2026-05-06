import { ChangePassword } from '@/components/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Change Password',
};

export default function ChangePasswordPage() {
	return <ChangePassword />;
}
