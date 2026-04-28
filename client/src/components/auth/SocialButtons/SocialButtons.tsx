'use client';

import Google from './Buttons/Google';
import styles from './SocialButtons.module.scss';

const SocialButtons = () => {
	return (
		<div className={styles.buttons}>
			<div>
				<Google />
			</div>
			<div className={styles.separator}></div>
		</div>
	);
};

export default SocialButtons;
