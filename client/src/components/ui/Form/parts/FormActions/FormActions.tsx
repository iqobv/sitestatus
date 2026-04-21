'use client';

import styles from './FormActions.module.scss';

interface FormActionsProps {
	children: React.ReactNode;
	className?: string;
}

const FormActions = ({ children, className }: FormActionsProps) => {
	return <div className={`${styles.formActions} ${className}`}>{children}</div>;
};

export default FormActions;
