import { CoreValue } from '../valuesCards';
import styles from './ValueCard.module.scss';

interface ValueCardProps {
	card: CoreValue;
}

const ValueCard = ({ card }: ValueCardProps) => {
	const Icon = card.icon;

	return (
		<div className={styles.valueCard}>
			<div className={styles.iconWrapper}>
				<Icon className={styles.icon} size={36} />
			</div>
			<div className={styles.content}>
				<h3 className={styles.title}>{card.title}</h3>
				<p className={styles.description}>{card.description}</p>
			</div>
		</div>
	);
};

export default ValueCard;
