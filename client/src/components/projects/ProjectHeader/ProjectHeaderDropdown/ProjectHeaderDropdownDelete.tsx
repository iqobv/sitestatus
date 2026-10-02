'use client';

import { deleteProject } from '@/api/project/deleteProject.api';
import { Button, ConfirmAction, DropdownItem } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { MdOutlineDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

interface ProjectHeaderDropdownDeleteProps {
	id: string;
	projectName: string;
}

export const ProjectHeaderDropdownDelete = ({
	id,
	projectName,
}: ProjectHeaderDropdownDeleteProps) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutate } = useMutation({
		mutationFn: () => deleteProject(id),
		onSuccess: () => {
			toast.success('Project deleted successfully');
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.projects.all,
			});
			router.push(PRIVATE_PAGES.PROJECTS.ALL);
		},
	});

	return (
		<ConfirmAction
			trigger={
				<DropdownItem asChild onSelect={(e) => e.preventDefault()}>
					<Button variant="outlined" color="danger">
						<MdOutlineDelete size={20} />
						Delete
					</Button>
				</DropdownItem>
			}
			title="Delete Project"
			description="Are you sure you want to delete this project? This action cannot be undone."
			confirmButtonText="Delete"
			onConfirm={() => mutate()}
			confirmWithInput
			exceptedInputValue={projectName}
		/>
	);
};
