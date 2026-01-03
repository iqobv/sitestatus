import { Action, Faq, Features, Hero } from '@/components/home';
import { Footer } from '@/components/layout';

export default function HomePage() {
	return (
		<>
			<Hero />
			<Features />
			<Action />
			<Faq />
			<Footer />
		</>
	);
}
