'use client';

import { IconBaseProps, IconType } from 'react-icons';
import {
	MdComputer,
	MdOutlineDevicesOther,
	MdOutlineSmartphone,
	MdOutlineTablet,
} from 'react-icons/md';

interface SessionDeviceProps {
	deviceType: string | null;
}

const icons: Record<string, IconType> = {
	desktop: MdComputer,
	tablet: MdOutlineTablet,
	mobile: MdOutlineSmartphone,
};

const iconProps: IconBaseProps = {
	size: 24,
};

const SessionDevice = ({ deviceType }: SessionDeviceProps) => {
	const IconComponent = deviceType ? icons[deviceType.toLowerCase()] : null;

	return IconComponent ? (
		<IconComponent {...iconProps} />
	) : (
		<MdOutlineDevicesOther {...iconProps} />
	);
};

export default SessionDevice;
