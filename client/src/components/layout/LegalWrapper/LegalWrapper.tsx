import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './LegalWrapper.module.scss';

interface LegalWrapperProps {
	document: string;
}

const LegalWrapper = ({ document }: LegalWrapperProps) => {
	return (
		<div className={styles.wrapper}>
			<article className={styles.article}>
				<ReactMarkdown remarkPlugins={[remarkGfm]}>{document}</ReactMarkdown>
			</article>
		</div>
	);
};

export default LegalWrapper;
