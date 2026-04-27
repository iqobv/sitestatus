import styles from './PublicPage.module.scss';
import PublicPageHeaderLoader from './PublicPageHeader/PublicPageHeaderLoader';
import PublicPageServicesLoader from './PublicPageServices/PublicPageServicesLoader';

const PublicPageLoader = () => {
	return (
		<div className={styles.publicPage}>
			<PublicPageHeaderLoader />
			<PublicPageServicesLoader />
		</div>
	);
};

export default PublicPageLoader;
