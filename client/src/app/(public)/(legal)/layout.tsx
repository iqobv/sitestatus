import { Footer } from '@/components/layout/Footer/Footer';
import { LegalHeader } from '@/components/layout/LegalHeader/LegalHeader';

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
