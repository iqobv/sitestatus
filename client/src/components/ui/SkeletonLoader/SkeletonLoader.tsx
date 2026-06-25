import { pxToRem } from '@/hooks/fromPxToRem.util';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonLoader = ({
	baseColor = 'var(--skeleton-base)',
	highlightColor = 'var(--skeleton-highlight)',
	borderRadius = 'var(--border-radius)',
	width,
	height,
	...rest
}: SkeletonProps) => {
	return (
		<Skeleton
			baseColor={baseColor}
			highlightColor={highlightColor}
			borderRadius={borderRadius}
			width={typeof width === 'number' ? pxToRem(width) : width}
			height={typeof height === 'number' ? pxToRem(height) : height}
			{...rest}
		/>
	);
};
