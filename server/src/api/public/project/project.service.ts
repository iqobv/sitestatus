import { Prisma } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { projectSelect } from '@libs/prisma';
import { withField } from '@libs/utils';
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { MonitorService } from '../monitor/services/monitor.service';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectService {
	constructor(
		private readonly prismaService: PgPrismaService,
		private readonly monitorService: MonitorService,
	) {}

	async createProject(dto: CreateProjectDto, userId: string) {
		try {
			return await this.prismaService.project.create({
				data: {
					...dto,
					isPublic: false,
					owner: { connect: { id: userId } },
				},
				select: projectSelect,
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ConflictException(
						withField(ERROR_MESSAGES.PROJECT.PROJECT_SLUG_EXISTS, 'slug'),
					);
				}
			}
			throw error;
		}
	}

	async getPublicProjectBySlug(slug: string) {
		const project = await this.prismaService.project.findUnique({
			where: { slug, isPublic: true },
			select: projectSelect,
		});

		if (!project) {
			throw new NotFoundException(ERROR_MESSAGES.PROJECT.PROJECT_NOT_FOUND);
		}

		const monitors = await this.monitorService.findAllPublicMonitors(
			project.id,
		);

		return { ...project, monitors };
	}

	async getProjectById(id: string, userId: string) {
		if (!isUUID(id)) {
			throw new NotFoundException(ERROR_MESSAGES.PROJECT.PROJECT_NOT_FOUND);
		}

		const project = await this.prismaService.project.findUnique({
			where: { id, ownerId: userId },
			select: projectSelect,
		});

		if (!project)
			throw new NotFoundException(ERROR_MESSAGES.PROJECT.PROJECT_NOT_FOUND);

		return project;
	}

	async getAllProjects(userId: string) {
		return await this.prismaService.project.findMany({
			where: { ownerId: userId },
			select: projectSelect,
		});
	}

	async updateProject(id: string, userId: string, dto: UpdateProjectDto) {
		await this.getProjectById(id, userId);

		try {
			return await this.prismaService.project.update({
				where: { id },
				data: {
					...dto,
				},
				select: projectSelect,
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ConflictException(
						withField(ERROR_MESSAGES.PROJECT.PROJECT_SLUG_EXISTS, 'slug'),
					);
				}
			}
			throw error;
		}
	}

	async deleteProject(id: string, userId: string) {
		await this.getProjectById(id, userId);

		await this.prismaService.project.delete({
			where: { id },
		});

		return SUCCESS_MESSAGES.PROJECT.PROJECT_DELETED;
	}
}
