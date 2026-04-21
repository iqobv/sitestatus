import { default as FormProvider } from './FormProvider';
import {
	FormActions,
	FormField,
	FormLabel,
	FormReset,
	FormSubmit,
} from './parts';

const Form = Object.assign(FormProvider, {
	Field: FormField,
	Actions: FormActions,
	Label: FormLabel,
	Reset: FormReset,
	Submit: FormSubmit,
});

export default Form;
