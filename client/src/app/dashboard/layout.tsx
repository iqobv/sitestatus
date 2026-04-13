import { DashboardHeader } from '@/components/layout';

export default function DashboardLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	return (
		<>
			<DashboardHeader />
			<main>{children}</main>
			{modal}
		</>
	);
}
