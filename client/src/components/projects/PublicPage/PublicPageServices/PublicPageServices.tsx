'use client';

import { PublicProjectPage } from '@/types';
import PublicPageService from './PublicPageService/PublicPageService';
import styles from './PublicPageServices.module.scss';

interface PublicPageServicesProps {
	data: PublicProjectPage;
}

const PublicPageServices = ({ data }: PublicPageServicesProps) => {
	return (
		<div className={styles.services}>
			{data.monitors.map((monitor) => (
				<PublicPageService key={monitor.id} monitor={monitor} />
			))}
		</div>
	);
};

export default PublicPageServices;
