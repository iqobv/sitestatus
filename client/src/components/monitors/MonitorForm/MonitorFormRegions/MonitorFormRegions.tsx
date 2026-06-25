'use client';

import { getAllRegions } from '@/api/region/region.api';
import { Checkbox, SectionHeader } from '@/components/ui';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { BaseRegionsMonitorDto } from '@/dto/monitor.dto';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import styles from './MonitorFormRegions.module.scss';
import { MonitorFormRegionsLoader } from './MonitorFormRegionsLoader';

export const MonitorFormRegions = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<BaseRegionsMonitorDto>();

	const { data, isLoading } = useQuery({
		queryFn: getAllRegions,
		queryKey: QUERY_KEYS.regions.lists(),
	});

	return (
		<div className={styles.regions}>
			{isLoading ? (
				<MonitorFormRegionsLoader />
			) : (
				<>
					<SectionHeader
						title="Regions"
						titleProps={{ variant: 'h2' }}
						padding={0}
					/>
					<ul className={styles.list}>
						{data?.map((region) => (
							<li key={region.id} className={styles.item}>
								<Checkbox
									id={region.key}
									value={region.id}
									label={region.name}
									isBordered
									{...register('regions')}
								/>
							</li>
						))}
					</ul>
				</>
			)}
			{errors.regions && (
				<p className="error-message">{errors.regions.message}</p>
			)}
		</div>
	);
};
