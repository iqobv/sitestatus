import { LoginDto } from '@/dto/auth.dto';
import { Field } from '@/types/ui/field.types';
import { MdOutlineEmail, MdOutlineKey } from 'react-icons/md';

export const LOGIN_FIELDS: Field<LoginDto>[] = [
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
		autoComplete: 'current-password',
		leftIcon: MdOutlineKey,
	},
];
