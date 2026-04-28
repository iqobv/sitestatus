import { Footer, LegalHeader } from '@/components/layout';

export default function LegalLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<LegalHeader />
			<main>{children}</main>
			<Footer />
		</>
	);
}
