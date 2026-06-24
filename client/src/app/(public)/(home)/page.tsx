import { Action } from '@/components/home/Action/Action';
import { Features } from '@/components/home/Features/Features';
import { Hero } from '@/components/home/Hero/Hero';
import { Values } from '@/components/home/Values/Values';

export default function HomePage() {
	return (
		<>
			<Hero />
			<Values />
			<Features />
			<Action />
		</>
	);
}
