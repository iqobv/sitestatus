import { Button } from '@/components/ui';
import { PUBLIC_PAGES } from '@/config';
import styles from './NotFoundWrapper.module.scss';

interface NotFoundWrapperProps {
	title: string;
	description?: string;
}

const NotFoundWrapper = ({ title, description }: NotFoundWrapperProps) => {
	return (
		<div className="container">
			<div className={styles.notFound}>
				<h2 className={styles.title}>404 - {title}</h2>
				<p className={styles.description}>
					{description ||
						'The page you are looking for does not exist or has been moved.'}
				</p>
				<Button href={PUBLIC_PAGES.HOME}>Back to Home</Button>
			</div>
		</div>
	);
};

export default NotFoundWrapper;
