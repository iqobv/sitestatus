export interface ConfirmActionProps {
	title: React.ReactNode | string;
	description: React.ReactNode | string;
	trigger: React.ReactElement;
	onConfirm: () => void;
	onCancel?: () => void;
	confirmButtonText?: string;
	cancelButtonText?: string;
	confirmWithInput?: boolean;
	inputLabel?: string;
	inputPlaceholder?: string;
	exceptedInputValue?: string;
}
