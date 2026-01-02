'use client';

import { useState } from 'react';
import styles from './Accordion.module.scss';
import { AccordionProps } from './Accordion.types';
import AccordionItem from './AccordionItem/AccordionItem';

const Accordion = ({
	multiple,
	items,
	defaultOpenIndexes,
	onChange,
	className,
}: AccordionProps) => {
	// const [openedIndexes, setOpenedIndexes] = useState<number[]>([]);
	const [openedIndexes, setOpenedIndexes] = useState<number[]>(() => {
		if (!defaultOpenIndexes || defaultOpenIndexes.length === 0) {
			return [];
		}

		if (multiple) {
			return defaultOpenIndexes;
		}

		return [defaultOpenIndexes[0]];
	});

	// useLayoutEffect(() => {
	// 	if (defaultOpenIndexes) {
	// 		if (multiple && defaultOpenIndexes.length > 0) {
	// 			setOpenedIndexes(defaultOpenIndexes);
	// 		} else if (!multiple && defaultOpenIndexes.length > 0) {
	// 			setOpenedIndexes([defaultOpenIndexes[0]]);
	// 		}
	// 	}
	// }, [multiple, defaultOpenIndexes]);

	const handleItemClick = (index: number) => {
		let newOpenedIndexes: number[] = [];

		if (multiple) {
			if (openedIndexes.includes(index)) {
				newOpenedIndexes = openedIndexes.filter((i) => i !== index);
			} else {
				newOpenedIndexes = [...openedIndexes, index];
			}
		} else {
			newOpenedIndexes = openedIndexes.includes(index) ? [] : [index];
		}

		setOpenedIndexes(newOpenedIndexes);

		if (onChange) {
			onChange(newOpenedIndexes);
		}
	};

	return (
		<div className={`${styles['accordion']} ${className}`}>
			{items.map((item, index) => (
				<AccordionItem
					key={index}
					title={item.title}
					content={item.content}
					isOpen={openedIndexes.includes(index)}
					onClick={() => handleItemClick(index)}
				/>
			))}
		</div>
	);
};

export default Accordion;
