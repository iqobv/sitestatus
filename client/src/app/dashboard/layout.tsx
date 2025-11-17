import { DashboardHeader } from '@/components/layout';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<DashboardHeader />
			<main>{children}</main>
		</>
	);
}
