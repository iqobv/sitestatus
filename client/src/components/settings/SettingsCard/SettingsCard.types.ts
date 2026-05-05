import { CSSProperties } from 'react';

export interface SettingsCardProps {
	title: React.ReactNode | string;
	description: React.ReactNode | string;
	action: React.ReactNode;
	className?: string;
	desktopDirection?: 'row' | 'column';
	actionJustify?: CSSProperties['justifyContent'];
}
