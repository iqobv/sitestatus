import { LoginDto } from '@/dto';
import { Field } from '@/types';
import { MdOutlineEmail, MdOutlineKey } from 'react-icons/md';

export const LOGIN_FIELDS: Field<LoginDto>[] = [
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
		autocomplete: 'current-password',
		iconLeft: MdOutlineKey,
	},
];
