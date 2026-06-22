import styles from './Dashboard.module.scss';
import { DashboardSectionLoader } from './DashboardSection/DashboardSectionLoader';

export const DashboardLoader = () => (
	<div className={styles.grid}>
		{Array.from({ length: 4 }).map((_, i) => (
			<DashboardSectionLoader key={i} />
		))}
	</div>
);
