import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Project } from 'generated/prisma/client';
import { SUCCESS_MESSAGES } from 'src/libs/constants';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

type ProjectServiceMock = {
	createProject: jest.Mock;
	getAllProjects: jest.Mock;
	getProjectById: jest.Mock;
	updateProject: jest.Mock;
	deleteProject: jest.Mock;
};

describe('ProjectController', () => {
	let controller: ProjectController;
	let service: ProjectServiceMock;

	const mockProject: Project = {
		id: 'project_1',
		ownerId: 'user_1',
		name: 'Test Project',
		description: 'A test project for demonstration purposes.',
		slug: 'test-project',
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const { id, ownerId } = mockProject;

	beforeEach(async () => {
		service = {
			createProject: jest.fn(),
			getAllProjects: jest.fn(),
			getProjectById: jest.fn(),
			updateProject: jest.fn(),
			deleteProject: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProjectController],
			providers: [{ provide: ProjectService, useValue: service }],
		}).compile();

		controller = module.get<ProjectController>(ProjectController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('Create Project', () => {
		const dto: CreateProjectDto = {
			name: 'Test Project',
			slug: 'test-project',
			description: undefined,
		};

		it('should create a new project', async () => {
			service.createProject.mockResolvedValue(mockProject);

			const result = await controller.createProject(dto, ownerId);

			expect(service.createProject).toHaveBeenCalledWith(dto, ownerId);
			expect(result).toEqual(mockProject);
		});

		it('should throw an error if project creation fails', async () => {
			service.createProject.mockRejectedValue(new ConflictException());

			await expect(controller.createProject(dto, ownerId)).rejects.toThrow(
				ConflictException,
			);
		});
	});

	describe('Get All Projects', () => {
		it('should return all projects for a given user', async () => {
			service.getAllProjects.mockResolvedValue([mockProject]);

			const result = await controller.getAllProjects(ownerId);

			expect(service.getAllProjects).toHaveBeenCalledWith(ownerId);
			expect(result).toEqual([mockProject]);
		});
	});

	describe('Get Project by ID', () => {
		it('should return a project by its ID', async () => {
			service.getProjectById.mockResolvedValue(mockProject);

			const result = await controller.getProjectById(id, ownerId);

			expect(service.getProjectById).toHaveBeenCalledWith(id, ownerId);
			expect(result).toEqual(mockProject);
		});

		it('should throw NotFoundException if project is not found', async () => {
			service.getProjectById.mockRejectedValue(
				new NotFoundException('Project not found'),
			);

			await expect(controller.getProjectById(id, ownerId)).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe('Update Project', () => {
		const dto: UpdateProjectDto = { name: 'Updated Name' };

		it('should update and return the project', async () => {
			service.updateProject.mockResolvedValue({ ...mockProject, ...dto });

			const result = await controller.updateProject(id, ownerId, dto);

			expect(service.updateProject).toHaveBeenCalledWith(id, ownerId, dto);
			expect(result.name).toBe(dto.name);
		});

		it('should propagate errors during update', async () => {
			service.updateProject.mockRejectedValue(new NotFoundException());

			await expect(controller.updateProject(id, ownerId, dto)).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe('Delete Project', () => {
		it('should call service.deleteProject and return success message', async () => {
			const response = SUCCESS_MESSAGES.PROJECT.PROJECT_DELETED;
			service.deleteProject.mockResolvedValue(response);

			const result = await controller.deleteProject(id, ownerId);

			expect(service.deleteProject).toHaveBeenCalledWith(id, ownerId);
			expect(result).toEqual(response);
		});
	});
});
