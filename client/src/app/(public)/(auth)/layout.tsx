import { AuthHeader } from '@/components/layout/Header/AuthHeader/AuthHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<AuthHeader />
			<main>{children}</main>
		</>
	);
}
