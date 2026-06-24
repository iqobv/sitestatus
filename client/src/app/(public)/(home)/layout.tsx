import { GoogleOneTap } from '@/components/auth';
import { Footer } from '@/components/layout/Footer/Footer';
import { HeaderMain } from '@/components/layout/Header/HeaderMain/HeaderMain';

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<HeaderMain />
			<main>{children}</main>
			<Footer />
			<GoogleOneTap />
		</>
	);
}
