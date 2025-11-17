import { EmailVerification } from '@/components/auth';

export default async function VerifyEmail({
	searchParams,
}: {
	searchParams: Promise<{ userId: string; token: string }>;
}) {
	const { token, userId } = await searchParams;

	return <EmailVerification userId={userId} token={token} />;
}
