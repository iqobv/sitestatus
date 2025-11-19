import { LoginDto } from '@/dto';
import { IField } from '@/types';
import { MdOutlineEmail, MdOutlineKey } from 'react-icons/md';

export const LOGIN_FIELDS: IField<LoginDto>[] = [
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
