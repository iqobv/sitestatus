import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'src/libs/constants';
import { Auth, Authorized } from 'src/libs/decorators';
import { createCustomMessageDto } from 'src/libs/utils';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from './dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Auth()
	@ApiOperation({
		summary: 'Create a new project',
		description: 'Creates a new project with the provided details',
	})
	@ApiOkResponse({ type: ProjectDto })
	@ApiConflictResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.PROJECT.PROJECT_SLUG_EXISTS),
	})
	@Post()
	async createProject(
		@Body() dto: CreateProjectDto,
		@Authorized('id') userId: string,
	) {
		return await this.projectService.createProject(dto, userId);
	}

	@Auth()
	@ApiOperation({
		summary: 'Get project by ID',
		description: 'Retrieves a project by its unique identifier',
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.PROJECT.PROJECT_NOT_FOUND),
	})
	@ApiOkResponse({ type: ProjectDto })
	@Get(':id')
	async getProjectById(
		@Param('id') id: string,
		@Authorized('id') userId: string,
	) {
		return await this.projectService.getProjectById(id, userId);
	}

	@Auth()
	@ApiOperation({
		summary: 'Get all projects',
		description: 'Retrieves a list of all projects',
	})
	@ApiOkResponse({ type: [ProjectDto] })
	@Get()
	async getAllProjects(@Authorized('id') userId: string) {
		return await this.projectService.getAllProjects(userId);
	}

	@Auth()
	@ApiOperation({
		summary: 'Update a project',
		description: 'Updates a project with the provided details',
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.PROJECT.PROJECT_NOT_FOUND),
	})
	@ApiOkResponse({ type: ProjectDto })
	@Patch(':id')
	async updateProject(
		@Param('id') id: string,
		@Authorized('id') userId: string,
		@Body() dto: UpdateProjectDto,
	) {
		return await this.projectService.updateProject(id, userId, dto);
	}

	@Auth()
	@ApiOperation({
		summary: 'Delete a project',
		description: 'Deletes a project with the provided details',
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.PROJECT.PROJECT_NOT_FOUND),
	})
	@ApiOkResponse({
		type: createCustomMessageDto(SUCCESS_MESSAGES.PROJECT.PROJECT_DELETED),
	})
	@Delete(':id')
	async deleteProject(
		@Param('id') id: string,
		@Authorized('id') userId: string,
	) {
		return await this.projectService.deleteProject(id, userId);
	}
}
