import { ResetPasswordDto } from '@/dto';
import { Field } from '@/types';
import { MdOutlineKey } from 'react-icons/md';

export const RESET_PASSWORD_FORM_FIELDS: Field<ResetPasswordDto>[] = [
	{
		name: 'newPassword',
		label: 'Create New Password',
		placeholder: 'Your secure password',
		type: 'password',
		autoComplete: 'new-password',
		iconLeft: MdOutlineKey,
		isRequired: true,
	},
	{
		name: 'newPasswordConfirm',
		label: 'Confirm New Password',
		placeholder: 'Re-enter your new password',
		type: 'password',
		autoComplete: 'new-password',
		iconLeft: MdOutlineKey,
		isRequired: true,
	},
];
