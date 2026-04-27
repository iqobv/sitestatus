'use client';

import { updateProject } from '@/api';
import { Dropdown, Loader } from '@/components/ui';
import { PUBLIC_PAGES, QUERY_KEYS } from '@/config';
import { UpdateProjectDto } from '@/dto';
import { Project } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdHideSource, MdOutlinePublic } from 'react-icons/md';
import { toast } from 'react-toastify';
import styles from '../ProjectHeaderDropdown.module.scss';

interface ProjectHeaderDropdownItemPublicPageProps {
	data: Project;
}

const ProjectHeaderDropdownItemPublicPage = ({
	data,
}: ProjectHeaderDropdownItemPublicPageProps) => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: (dto: UpdateProjectDto) =>
			updateProject(data.id, { isPublic: dto.isPublic }),
		onSuccess: (result) => {
			if (!data.isPublic && result.isPublic) {
				router.push(PUBLIC_PAGES.PUBLIC_PROJECT(result.slug));
				toast.success('Public page created successfully');
			} else if (data.isPublic && !result.isPublic) {
				toast.success('Public page closed successfully');
			}

			queryClient.refetchQueries({
				queryKey: QUERY_KEYS.project.byId(data.id),
			});
		},
	});

	const handleClickCreatePublicPage = () => {
		if (!data.isPublic && !isPending) {
			mutate({ isPublic: true });
		}
	};

	const handleClickClosePublicPage = () => {
		if (data.isPublic && !isPending) {
			mutate({ isPublic: false });
		}
	};

	return (
		<>
			<Dropdown.Item asChild>
				{data.isPublic ? (
					<Link href={PUBLIC_PAGES.PUBLIC_PROJECT(data.slug)}>
						<MdOutlinePublic size={20} />
						View Public Page
					</Link>
				) : (
					<button disabled={isPending} onClick={handleClickCreatePublicPage}>
						<MdOutlinePublic size={20} />
						Make Public Page
						{isPending && (
							<Loader
								containerClassName={styles.loader}
								disablePadding
								size={20}
								thickness={4}
							/>
						)}
					</button>
				)}
			</Dropdown.Item>
			{data.isPublic && (
				<Dropdown.Item
					onClick={handleClickClosePublicPage}
					disabled={isPending}
				>
					<MdHideSource size={20} />
					Close Public Page
				</Dropdown.Item>
			)}
		</>
	);
};

export default ProjectHeaderDropdownItemPublicPage;
