'use client';

import {
	Children,
	cloneElement,
	isValidElement,
	ReactElement,
	ReactNode,
} from 'react';
import styles from './ButtonContent.module.scss';

interface ButtonContentProps {
	children: ReactNode;
	loading: boolean;
	className?: string;
	asChild?: boolean;
}

export const ButtonContent = ({
	children,
	loading,
	asChild,
}: ButtonContentProps) => {
	const contentStyle = {
		visibility: loading ? 'hidden' : 'visible',
		opacity: loading ? 0 : 1,
	} as const;

	if (asChild) {
		const childArray = Children.toArray(children);
		const child = childArray[0];

		if (isValidElement(child)) {
			const childElement = child as ReactElement<{ children?: ReactNode }>;

			return cloneElement(
				childElement,
				undefined,
				<span className={styles.content} style={contentStyle}>
					{childElement.props.children}
				</span>,
			);
		}
	}

	return (
		<span className={styles.content} style={contentStyle}>
			{children}
		</span>
	);
};
