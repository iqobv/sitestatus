import { StatusPageFooter } from '@/components/layout';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<main>{children}</main>
			<StatusPageFooter />
		</>
	);
}
