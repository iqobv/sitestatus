export interface AccordionItemProps {
	title: React.ReactNode;
	content: React.ReactNode;
	defaultOpen?: boolean;
}

export interface AccordionProps {
	multiple?: boolean;
	items: AccordionItemProps[];
	defaultOpenIndexes?: number[];
	onChange?: (openIndexes: number[]) => void;
	className?: string;
}
