'use client';

import { QueryKey, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

interface UseUpdateTimerProps {
	queryKey: QueryKey;
	isActive: boolean;
	initialTime?: number;
}

export const useUpdateTimer = ({
	queryKey,
	isActive,
	initialTime = 60,
}: UseUpdateTimerProps) => {
	const queryClient = useQueryClient();

	const [timer, setTimer] = useState<number>(initialTime);

	const handleRefresh = useCallback(() => {
		queryClient.refetchQueries({
			queryKey,
		});
		setTimer(initialTime);
	}, [queryClient, queryKey, initialTime]);

	useEffect(() => {
		if (!isActive) return;

		let timeout: NodeJS.Timeout;

		if (timer > 0) {
			timeout = setTimeout(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
		}

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [handleRefresh, timer]);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		if (timer <= 0) handleRefresh();
	}, [handleRefresh, timer]);

	return {
		timer,
		handleRefresh,
	};
};
