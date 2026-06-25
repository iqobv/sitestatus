import { StatusPageFooter } from '@/components/layout/StatusPageFooter/StatusPageFooter';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<main>{children}</main>
			<StatusPageFooter />
		</>
	);
}
