import styles from './ButtonGroup.module.scss';

interface ButtonGroupProps {
	children: React.ReactNode;
	direction?: 'vertical' | 'horizontal';
	padding?: number;
	gap?: number;
	className?: string;
}

const ButtonGroup = ({
	children,
	padding = 8,
	direction = 'horizontal',
	gap = 0,
	className,
}: ButtonGroupProps) => {
	const classNames = [
		styles['button-group'],
		gap === 0 && styles['button-group--no-gap'],
		className,
	]
		.filter(Boolean)
		.join(' ')
		.trim();

	return (
		<div
			className={classNames}
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

export default ButtonGroup;
