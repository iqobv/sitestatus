import ValueCard from './ValueCard/ValueCard';
import styles from './Values.module.scss';
import { CORE_VALUES } from './valuesCards';

const Values = () => {
	return (
		<div className={`${styles.values} container`}>
			{CORE_VALUES.map((card, index) => (
				<ValueCard key={index} card={card} />
			))}
		</div>
	);
};

export default Values;
