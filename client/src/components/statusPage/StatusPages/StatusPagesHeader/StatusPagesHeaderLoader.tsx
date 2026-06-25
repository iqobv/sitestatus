import {
	IconButtonLoader,
	SectionHeader,
	SkeletonLoader,
} from '@/components/ui';

export const StatusPagesHeaderLoader = () => {
	return (
		<SectionHeader
			title={<SkeletonLoader height="3rem" width="13rem" />}
			rightSlot={<IconButtonLoader width={230} />}
		/>
	);
};
