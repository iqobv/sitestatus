'use client';

import { MdKeyboardArrowUp } from 'react-icons/md';
import type { AccordionItemProps as AccordionItemPropsType } from '../Accordion.types';
import styles from './AccordionItem.module.scss';

interface AccordionItemProps extends AccordionItemPropsType {
	onClick?: () => void;
	isOpen?: boolean;
}

const AccordionItem = ({
	title,
	content,
	isOpen = false,
	onClick,
}: AccordionItemProps) => {
	return (
		<div
			className={`${styles['accordion-item']} ${
				isOpen ? styles['accordion-item--open'] : ''
			}`}
		>
			<div className={styles['accordion-item__header']} onClick={onClick}>
				<div className={styles['accordion-item__title']}>{title}</div>
				<MdKeyboardArrowUp className={styles['accordion-item__icon']} />
			</div>
			<div className={styles['accordion-item__body']}>
				<div className={styles['accordion-item__content']}>{content}</div>
			</div>
		</div>
	);
};

export default AccordionItem;
