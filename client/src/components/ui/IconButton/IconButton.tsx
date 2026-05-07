import Button from '../Button/Button';
import styles from './IconButton.module.scss';
import { IconButtonProps } from './IconButton.types';

const IconButton = ({ buttonProps, Icon, href, children }: IconButtonProps) => {
	const buttonClassNames = [styles.button, buttonProps?.className]
		.filter(Boolean)
		.join(' ');

	return (
		<Button className={buttonClassNames} href={href} {...buttonProps}>
			<Icon size={20} />
			<p className={styles.text}>{children}</p>
		</Button>
	);
};

export default IconButton;
