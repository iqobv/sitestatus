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
		<div className={styles.status}>
			<div
				className={`${styles.indicator} ${
					styles[`${status.toLowerCase().replaceAll('/', '')}`]
				}`}
			/>
			{showText && <p className={textClassName}>{capitalize(status)}</p>}
		</div>
	);
};

export default UptimeStatus;
