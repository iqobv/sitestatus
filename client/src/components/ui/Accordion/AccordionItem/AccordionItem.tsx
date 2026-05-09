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
		<div className={`${styles.item} ${isOpen ? styles.open : ''}`}>
			<div className={styles.header} onClick={onClick}>
				<div className={styles.title}>{title}</div>
				<MdKeyboardArrowUp className={styles.icon} />
			</div>
			<div className={styles.body}>
				<div className={styles.content}>{content}</div>
			</div>
		</div>
	);
};

export default AccordionItem;
