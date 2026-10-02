import clsx from 'clsx';
import styles from './ButtonGroup.module.scss';

interface ButtonGroupProps {
	children: React.ReactNode;
	direction?: 'vertical' | 'horizontal';
	padding?: number;
	gap?: number;
	className?: string;
}

export const ButtonGroup = ({
	children,
	padding = 8,
	direction = 'horizontal',
	gap = 0,
	className,
}: ButtonGroupProps) => {
	return (
		<div
			className={clsx(styles.buttonGroup, gap === 0 && styles.noGap, className)}
			style={
				{
					'--padding': `${padding}px`,
					'--direction': direction === 'horizontal' ? 'row' : 'column',
					'--gap': `${gap}px`,
				} as React.CSSProperties
			}
		>
			{children}
		</div>
	);
};
