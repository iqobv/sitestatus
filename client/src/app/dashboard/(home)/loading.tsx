import { MonitorsLoader } from '@/components/monitors';
import styles from './home.module.scss';

export default function Loading() {
	return (
		<div className={`${styles['home']} page container`}>
			<MonitorsLoader />
		</div>
	);
}
