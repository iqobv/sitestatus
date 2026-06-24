import { pxToRem } from '@/hooks/fromPxToRem.util';
import { ButtonBaseProps } from '../Button/Button.types';
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader';
import styles from './IconButton.module.scss';

interface IconButtonLoaderProps {
	buttonProps?: Omit<ButtonBaseProps, 'children'>;
	width?: number;
	withText?: boolean;
	height?: number;
}

export const IconButtonLoader = ({
	buttonProps,
	width = 180,
	withText = true,
	height = 46,
}: IconButtonLoaderProps) => {
	const classNames = [
		styles.loaderContainer,
		withText && styles.text,
		buttonProps?.className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div
			className={classNames}
			style={
				{
					'--width': width > 0 ? pxToRem(width) : pxToRem(46),
					'--height': height > 0 ? pxToRem(height) : pxToRem(46),
				} as React.CSSProperties
			}
		>
			<SkeletonLoader width="100%" height="100%" />
		</div>
	);
};
