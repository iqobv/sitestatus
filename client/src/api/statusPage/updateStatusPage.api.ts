import { UpdateStatusPageDto } from '@/dto/statusPage.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type UpdateStatusPageResponse =
	paths['/v1/status-pages/{id}']['patch']['responses']['200']['content']['application/json'];

export const updateStatusPage = async (id: string, dto: UpdateStatusPageDto) =>
	(
		await apiClient.patch<UpdateStatusPageResponse>(
			`/v1/status-pages/${id}`,
			dto,
		)
	).data;
