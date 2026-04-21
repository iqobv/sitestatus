import { IconType } from 'react-icons';
import {
	MdOutlineAccountTree,
	MdOutlineBolt,
	MdOutlineGppGood,
} from 'react-icons/md';

export interface CoreValue {
	title: string;
	description: string;
	icon: IconType;
}

export const CORE_VALUES: CoreValue[] = [
	{
		title: 'Uncompromising Uptime',
		description:
			'High-frequency checks from diverse global nodes. Know exactly when and where your infrastructure experiences downtime, without the noise.',
		icon: MdOutlineGppGood,
	},
	{
		title: 'Faster Incident Response',
		description:
			'Reduce MTTR with precise, region-specific diagnostic data. Stay informed with automated email notifications when your systems go down.',
		icon: MdOutlineBolt,
	},
	{
		title: 'Hybrid Project Architecture',
		description:
			'Organize monitoring by environment, region, or stack. Managed hierarchies built for engineering teams.',
		icon: MdOutlineAccountTree,
	},
];
