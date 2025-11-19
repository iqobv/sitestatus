import { RegisterFormDto } from '@/dto';
import { IField } from '@/types';
import { MdOutlineEmail, MdOutlineKey } from 'react-icons/md';

export const REGISTER_FIELDS: IField<RegisterFormDto>[] = [
	{
		name: 'email',
		label: 'Enter your email',
		placeholder: 'user@example.com',
		type: 'email',
		autocomplete: 'username',
		iconLeft: MdOutlineEmail,
	},
	{
		name: 'password',
		label: 'Enter Password',
		placeholder: 'Your secure password',
		type: 'password',
		autocomplete: 'new-password',
		iconLeft: MdOutlineKey,
	},
	{
		name: 'passwordConfirm',
		label: 'Confirm Your Password',
		placeholder: 'Re-enter your secure password',
		type: 'password',
		autocomplete: 'new-password',
		iconLeft: MdOutlineKey,
	},
];
