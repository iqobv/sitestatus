'use client';

import Github from './Buttons/Github';
import Google from './Buttons/Google';
import styles from './SocialButtons.module.scss';

const SocialButtons = () => {
	return (
		<div className={styles.buttons}>
			<div className={styles.list}>
				<Google />
				<Github />
			</div>
			<div className={styles.separator}></div>
		</div>
	);
};

export default SocialButtons;
