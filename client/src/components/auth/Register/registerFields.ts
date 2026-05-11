import { RegisterFormDto } from '@/dto';
import { Field } from '@/types';
import { MdOutlineEmail, MdOutlineKey } from 'react-icons/md';

export const REGISTER_FIELDS: Field<RegisterFormDto>[] = [
	{
		name: 'email',
		label: 'Enter your email',
		placeholder: 'user@example.com',
		type: 'email',
		autoComplete: 'username',
		leftIcon: MdOutlineEmail,
	},
	{
		name: 'password',
		label: 'Enter Password',
		placeholder: 'Your secure password',
		type: 'password',
		autoComplete: 'new-password',
		leftIcon: MdOutlineKey,
	},
	{
		name: 'passwordConfirm',
		label: 'Confirm Your Password',
		placeholder: 'Re-enter your secure password',
		type: 'password',
		autoComplete: 'new-password',
		leftIcon: MdOutlineKey,
	},
];
