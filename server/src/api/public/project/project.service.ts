import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'src/libs/constants';
import { projectSelect } from 'src/libs/prisma';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectService {
	constructor(private readonly prismaService: PrismaService) {}

	async createProject(dto: CreateProjectDto, userId: string) {
		const { name, slug, description } = dto;

		try {
			return await this.prismaService.project.create({
				data: {
					name,
					slug,
					description,
					owner: { connect: { id: userId } },
				},
				select: projectSelect,
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ConflictException(
						ERROR_MESSAGES.PROJECT.PROJECT_SLUG_EXISTS,
					);
				}
			}
			throw error;
		}
	}

	async getProjectBySlug(slug: string, throwError: boolean = true) {
		const project = await this.prismaService.project.findUnique({
			where: { slug },
			select: projectSelect,
		});

		if (!project && throwError) {
			throw new NotFoundException(ERROR_MESSAGES.PROJECT.PROJECT_NOT_FOUND);
		}

		return project;
	}

	async getProjectById(id: string, userId: string) {
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
		const { description, name, slug } = dto;

		await this.getProjectById(id, userId);

		try {
			return await this.prismaService.project.update({
				where: { id },
				data: {
					description,
					name,
					slug,
				},
				select: projectSelect,
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ConflictException(
						ERROR_MESSAGES.PROJECT.PROJECT_SLUG_EXISTS,
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
