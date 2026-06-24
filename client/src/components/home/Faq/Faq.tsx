import { Accordion, SectionHeader } from '@/components/ui';
import styles from './Faq.module.scss';
import { FAQ_QUESTIONS } from './faqQuestions';

export const Faq = () => {
	return (
		<div className={`${styles.faq} container`}>
			<SectionHeader
				title="Frequently Asked Questions"
				titleProps={{
					as: 'h3',
				}}
			/>
			<Accordion
				multiple={false}
				items={FAQ_QUESTIONS}
				className={styles.accordion}
			/>
		</div>
	);
};
