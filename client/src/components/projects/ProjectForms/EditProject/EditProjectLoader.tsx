import { SkeletonLoader } from '@/components/ui';
import styles from './EditProject.module.scss';
import { EDIT_PROJECT_FIELDS } from './editProjectFields';

const fields = Array.from({ length: EDIT_PROJECT_FIELDS.length }).map(
	(_, i) => <SkeletonLoader key={i} height={100} />,
);

const buttons = Array.from({ length: 2 }).map((_, i) => (
	<SkeletonLoader key={i} width={i === 0 ? 94 : 150} height={44} />
));

const EditProjectLoader = () => {
	return (
		<div className={styles.editProjectLoader}>
			{fields}
			<div className={styles.formActions}>{buttons}</div>
		</div>
	);
};

export default EditProjectLoader;
