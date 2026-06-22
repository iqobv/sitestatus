import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { projectSelect } from '@libs/prisma/project-select.prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
	constructor(private readonly prismaService: PgPrismaService) {}

	async createProject(dto: CreateProjectDto, userId: string) {
		return await this.prismaService.project.create({
			data: {
				...dto,
				owner: { connect: { id: userId } },
			},
			select: projectSelect,
		});
	}

	async getProjectById(id: string, userId: string) {
		if (!isUUID(id)) {
			throw new NotFoundException(ERROR_MESSAGES.PROJECT.NOT_FOUND);
		}

		const project = await this.prismaService.project.findUnique({
			where: { id, ownerId: userId, deletedAt: null },
			select: projectSelect,
		});

		if (!project) throw new NotFoundException(ERROR_MESSAGES.PROJECT.NOT_FOUND);

		return project;
	}

	async getAllProjects(userId: string) {
		return await this.prismaService.project.findMany({
			where: { ownerId: userId, deletedAt: null },
			select: projectSelect,
		});
	}

	async getAllProjectsWithMonitors(userId: string) {
		return await this.prismaService.project.findMany({
			where: { ownerId: userId, deletedAt: null },
			select: { ...projectSelect, monitors: true },
		});
	}

	async updateProject(id: string, userId: string, dto: UpdateProjectDto) {
		await this.getProjectById(id, userId);

		return await this.prismaService.project.update({
			where: { id, ownerId: userId, deletedAt: null },
			data: {
				...dto,
			},
			select: projectSelect,
		});
	}

	async deleteProject(id: string, userId: string) {
		await this.getProjectById(id, userId);

		await this.prismaService.project.update({
			where: { id, ownerId: userId, deletedAt: null },
			data: { deletedAt: new Date() },
		});

		return SUCCESS_MESSAGES.PROJECT.DELETED;
	}
}
