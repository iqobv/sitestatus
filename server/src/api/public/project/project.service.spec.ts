import { Prisma, Project } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { SUCCESS_MESSAGES } from '@libs/constants';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { ProjectService } from './project.service';

type PrismaMock = {
	project: {
		create: jest.Mock;
		findUnique: jest.Mock;
		findMany: jest.Mock;
		update: jest.Mock;
		delete: jest.Mock;
	};
};

describe('ProjectService', () => {
	let service: ProjectService;
	let prisma: PrismaMock;

	const mockProject: Project = {
		id: 'project_1',
		ownerId: 'user_1',
		name: 'Test Project',
		description: 'A test project for demonstration purposes.',
		slug: 'test-project',
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const prismaError = new Prisma.PrismaClientKnownRequestError(
		'Unique constraint failed on the fields: (`slug`)',
		{
			code: 'P2002',
			clientVersion: '5.0.0',
		},
	);

	const { id, ownerId } = mockProject;

	beforeEach(async () => {
		prisma = {
			project: {
				create: jest.fn(),
				findUnique: jest.fn(),
				findMany: jest.fn(),
				update: jest.fn(),
				delete: jest.fn(),
			},
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProjectService,
				{ provide: PgPrismaService, useValue: prisma },
			],
		}).compile();

		service = module.get<ProjectService>(ProjectService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('Create Project', () => {
		it('should create a new project', async () => {
			prisma.project.create.mockResolvedValue(mockProject);

			const dto: CreateProjectDto = {
				name: 'New Project',
				slug: 'new-project',
				description: undefined,
			};

			const result = await service.createProject(dto, ownerId);

			expect(prisma.project.create).toHaveBeenCalledWith({
				data: {
					...dto,
					owner: {
						connect: {
							id: ownerId,
						},
					},
				},
			});
			expect(result).toEqual(mockProject);
		});

		it('should throw an error if a project with the same slug already exists', async () => {
			prisma.project.create.mockRejectedValueOnce(prismaError);

			const dto: CreateProjectDto = {
				name: 'New Project',
				slug: 'new-project',
				description: undefined,
			};

			await expect(service.createProject(dto, ownerId)).rejects.toThrow(
				ConflictException,
			);
		});
	});

	describe('Get Project by ID', () => {
		it('should return the project with the specified ID', async () => {
			prisma.project.findUnique.mockResolvedValue(mockProject);

			const result = await service.getProjectById(id, ownerId);

			expect(prisma.project.findUnique).toHaveBeenCalledWith({
				where: { id, ownerId },
			});
			expect(result).toEqual(mockProject);
		});

		it('should throw NotFoundException if the project is not found', async () => {
			prisma.project.findUnique.mockResolvedValue(null);

			await expect(service.getProjectById(id, ownerId)).rejects.toThrow(
				NotFoundException,
			);
		});

		it('should throw NotFoundException if the project owner is not the same as the user', async () => {
			prisma.project.findUnique.mockResolvedValue(null);

			await expect(service.getProjectById(id, 'user_2')).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe('Get All Projects', () => {
		it('should return all projects', async () => {
			prisma.project.findMany.mockResolvedValue([mockProject]);

			const result = await service.getAllProjects(ownerId);

			expect(prisma.project.findMany).toHaveBeenCalled();
			expect(result).toEqual([mockProject]);
		});

		it('should return an empty array if no projects are found', async () => {
			prisma.project.findMany.mockResolvedValue([]);

			const result = await service.getAllProjects(ownerId);

			expect(prisma.project.findMany).toHaveBeenCalled();
			expect(result).toEqual([]);
		});
	});

	describe('Update Project', () => {
		const dto: UpdateProjectDto = {
			name: 'Updated Project',
		};

		it('should update an existing project', async () => {
			prisma.project.findUnique.mockResolvedValue(mockProject);
			prisma.project.update.mockResolvedValue(mockProject);

			const result = await service.updateProject(id, ownerId, dto);

			expect(prisma.project.findUnique).toHaveBeenCalledWith({
				where: { id, ownerId },
			});
			expect(prisma.project.update).toHaveBeenCalledWith({
				where: { id },
				data: dto,
			});
			expect(result).toEqual(mockProject);
		});

		it('should throw NotFoundException if the project is not found', async () => {
			prisma.project.findUnique.mockResolvedValue(null);

			await expect(service.updateProject(id, ownerId, dto)).rejects.toThrow(
				NotFoundException,
			);
		});

		it('should throw ConflictException if a project with the same slug already exists', async () => {
			prisma.project.findUnique.mockResolvedValue(mockProject);
			prisma.project.update.mockRejectedValueOnce(prismaError);

			const dto: UpdateProjectDto = {
				name: 'Updated Project',
				slug: 'existing-project',
			};

			await expect(service.updateProject(id, ownerId, dto)).rejects.toThrow(
				ConflictException,
			);
		});
	});

	describe('Delete Project', () => {
		it('should delete an existing project', async () => {
			prisma.project.findUnique.mockResolvedValue(mockProject);
			prisma.project.delete.mockResolvedValue(mockProject);

			const result = await service.deleteProject(id, ownerId);

			expect(prisma.project.findUnique).toHaveBeenCalledWith({
				where: { id, ownerId },
			});
			expect(prisma.project.delete).toHaveBeenCalledWith({
				where: { id },
			});
			expect(result).toEqual(SUCCESS_MESSAGES.PROJECT.PROJECT_DELETED);
		});

		it('should throw NotFoundException if the project is not found', async () => {
			prisma.project.findUnique.mockResolvedValue(null);

			await expect(service.deleteProject(id, ownerId)).rejects.toThrow(
				NotFoundException,
			);
		});
	});
});
