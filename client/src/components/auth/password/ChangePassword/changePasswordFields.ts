import { ChangePasswordDto } from '@/dto';
import { Field } from '@/types';
import { MdOutlineKey } from 'react-icons/md';

export const CHANGE_PASSWORD_FIELDS: Field<ChangePasswordDto>[] = [
	{
		name: 'oldPassword',
		label: 'Current Password',
		type: 'password',
		autoComplete: 'current-password',
		placeholder: 'Your current password',
		leftIcon: MdOutlineKey,
		isRequired: true,
	},
	{
		name: 'newPassword',
		label: 'New Password',
		type: 'password',
		autoComplete: 'new-password',
		placeholder: 'Your new password',
		leftIcon: MdOutlineKey,
		isRequired: true,
	},
	{
		name: 'newPasswordConfirm',
		label: 'Confirm New Password',
		type: 'password',
		autoComplete: 'new-password',
		placeholder: 'Re-enter your new password',
		leftIcon: MdOutlineKey,
		isRequired: true,
	},
];
