'use client';

import { capitalize } from '@/utils';
import styles from './UptimeStatus.module.scss';
import { UptimeStatusProps } from './UptimeStatus.types';

const UptimeStatus = ({
	status,
	showText = true,
	textClassName,
}: UptimeStatusProps) => {
	return (
		<div className={styles['uptime-status']}>
			<div
				className={`${styles['uptime-status__indicator']} ${
					styles[
						`uptime-status__indicator--${status
							.toLowerCase()
							.replaceAll('/', '')}`
					]
				}`}
			/>
			{showText && <p className={textClassName}>{capitalize(status)}</p>}
		</div>
	);
};

export default UptimeStatus;
