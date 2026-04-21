import { Action, Features, Hero, Values } from '@/components/home';
import { Footer } from '@/components/layout';

export default function HomePage() {
	return (
		<>
			<Hero />
			<Values />
			<Features />
			<Action />
			<Footer />
		</>
	);
}
