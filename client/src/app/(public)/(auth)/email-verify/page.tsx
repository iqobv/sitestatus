import { EmailVerification } from '@/components/auth';

export default async function VerifyEmail({
	searchParams,
}: {
	searchParams: Promise<{ token?: string }>;
}) {
	const { token } = await searchParams;

	return <EmailVerification token={token} />;
}
