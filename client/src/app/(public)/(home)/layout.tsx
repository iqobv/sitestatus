import { HeaderMain } from '@/components/layout';

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<HeaderMain />
			<main>{children}</main>
		</>
	);
}
