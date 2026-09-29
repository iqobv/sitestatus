import { Prisma } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { projectSelect } from '@libs/prisma/project-select.prisma';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { paginate } from '@libs/utils/paginate.util';
import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { isUUID } from 'class-validator';
import { CreateProjectDto } from './dto/create-project.dto';
import { PaginatedProjectsDto } from './dto/paginated-projects.dto';
import { ProjectDto, ProjectWithMonitorsDto } from './dto/project.dto';
import { ProjectsQueryDto } from './dto/projects-query.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
	constructor(private readonly prismaService: PgPrismaService) {}

	public async createProject(
		dto: CreateProjectDto,
		userId: string,
	): Promise<ProjectDto> {
		const project = await this.prismaService.project.create({
			data: {
				...dto,
				owner: { connect: { id: userId } },
			},
			select: projectSelect,
		});

		return plainToInstance(ProjectDto, project);
	}

	public async getProjectById(id: string, userId: string): Promise<ProjectDto> {
		if (!isUUID(id) || !id)
			throw new NotFoundException(ERROR_MESSAGES.PROJECT.NOT_FOUND);

		const project = await this.prismaService.project.findFirst({
			where: { id, ownerId: userId, deletedAt: null },
			select: projectSelect,
		});

		if (!project) throw new NotFoundException(ERROR_MESSAGES.PROJECT.NOT_FOUND);

		return plainToInstance(ProjectDto, project);
	}

	public async getAllProjects(
		userId: string,
		query: ProjectsQueryDto,
	): Promise<PaginatedProjectsDto> {
		const {
			page = 1,
			limit = 20,
			sortBy = 'createdAt',
			sortOrder = 'desc',
			search,
		} = query || {};

		const where: Prisma.ProjectWhereInput = {
			ownerId: userId,
			name: { contains: search, mode: 'insensitive' },
			deletedAt: null,
		};

		const result = await paginate({ page, limit }, async (limit, offset) => {
			const [data, total] = await this.prismaService.$transaction([
				this.prismaService.project.findMany({
					where,
					orderBy: { [sortBy]: sortOrder },
					skip: offset,
					take: limit,
					select: projectSelect,
				}),
				this.prismaService.project.count({
					where,
				}),
			]);

			return { data, total };
		});

		return plainToInstance(PaginatedProjectsDto, result);
	}

	public async getAllProjectsWithMonitors(
		userId: string,
	): Promise<ProjectWithMonitorsDto[]> {
		const projects = await this.prismaService.project.findMany({
			where: { ownerId: userId, deletedAt: null },
			select: { ...projectSelect, monitors: true },
		});

		return plainToInstance(ProjectWithMonitorsDto, projects);
	}

	public async updateProject(
		id: string,
		userId: string,
		dto: UpdateProjectDto,
	): Promise<ProjectDto> {
		await this.getProjectById(id, userId);

		const project = await this.prismaService.project.update({
			where: { id, ownerId: userId, deletedAt: null },
			data: {
				...dto,
			},
			select: projectSelect,
		});

		return plainToInstance(ProjectDto, project);
	}

	public async deleteProject(
		id: string,
		userId: string,
	): Promise<MessageResponse> {
		await this.getProjectById(id, userId);

		await this.prismaService.project.update({
			where: { id, ownerId: userId, deletedAt: null },
			data: { deletedAt: new Date() },
		});

		return SUCCESS_MESSAGES.PROJECT.DELETED;
	}
}
