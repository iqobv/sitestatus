import { GoogleOneTap } from '@/components/auth';
import { Footer, HeaderMain } from '@/components/layout';

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
