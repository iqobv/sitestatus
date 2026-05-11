'use client';

import { terminateAllOtherSessions, terminateSpecificSession } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useTerminateMutations = () => {
	const queryClient = useQueryClient();

	const terminateSessionMutation = useMutation({
		mutationFn: (sessionId: string) => terminateSpecificSession(sessionId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.session.all });
			toast.success('Session has been terminated successfully');
		},
		onError: (e) => {
			const errorMessage =
				e instanceof Error
					? e.message
					: 'An error occurred while terminating the session';

			toast.error(errorMessage);
		},
	});

	const terminateAllOtherSessionsMutation = useMutation({
		mutationFn: terminateAllOtherSessions,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.session.all });
			toast.success('All other sessions have been terminated successfully');
		},
		onError: (e) => {
			const errorMessage =
				e instanceof Error
					? e.message
					: 'An error occurred while terminating the sessions';

			toast.error(errorMessage);
		},
	});

	return { terminateSessionMutation, terminateAllOtherSessionsMutation };
};
