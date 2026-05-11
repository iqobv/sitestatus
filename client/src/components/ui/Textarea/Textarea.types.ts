import React from 'react';
import { TextareaAutosizeProps } from 'react-textarea-autosize';

export interface TextareaProps extends TextareaAutosizeProps {
	error?: string;
	label?: React.ReactNode;
	ref?: React.Ref<HTMLTextAreaElement>;
}
