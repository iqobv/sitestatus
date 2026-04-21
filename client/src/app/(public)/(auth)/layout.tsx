import { AuthHeader } from '@/components/layout';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<AuthHeader />
			<main>{children}</main>
		</>
	);
}
