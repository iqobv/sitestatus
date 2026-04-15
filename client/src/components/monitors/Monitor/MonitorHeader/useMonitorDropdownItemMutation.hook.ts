'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface UseMonitorDropdownItemMutationProps<T> {
	monitorId: string;
	mutationFn: (monitorId: string) => Promise<T>;
	onSuccess?: (data: T) => void;
}

export const useMonitorDropdownItemMutation = <T>({
	monitorId,
	mutationFn,
	onSuccess,
}: UseMonitorDropdownItemMutationProps<T>) => {
	return useMutation({
		mutationFn: () => mutationFn(monitorId),
		onSuccess: (data: T) => {
			onSuccess?.(data);
		},
		onError: (error) => {
			toast.error(error.message || 'An error occurred');
		},
	});
};
