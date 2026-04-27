import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { Auth, Authorized } from '@libs/decorators';
import { createCustomMessageDto } from '@libs/utils';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import {
	CreateProjectDto,
	ProjectDto,
	PublicProjectDto,
	UpdateProjectDto,
} from './dto';
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
		type: createCustomMessageDto(
			ERROR_MESSAGES.PROJECT.PROJECT_SLUG_EXISTS,
			'slug',
		),
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
	@Get('id/:id')
	async getProjectById(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	) {
		return await this.projectService.getProjectById(id, userId);
	}

	@ApiOperation({
		summary: 'Get public project by slug',
		description: 'Retrieves a public project by its unique slug',
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.PROJECT.PROJECT_NOT_FOUND),
	})
	@ApiOkResponse({ type: PublicProjectDto })
	@Get('slug/:slug')
	async getPublicProjectBySlug(@Param('slug') slug: string) {
		return await this.projectService.getPublicProjectBySlug(slug);
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
	@ApiConflictResponse({
		type: createCustomMessageDto(
			ERROR_MESSAGES.PROJECT.PROJECT_SLUG_EXISTS,
			'slug',
		),
	})
	@ApiOkResponse({ type: ProjectDto })
	@Patch(':id')
	async updateProject(
		@Param('id', ParseUUIDPipe) id: string,
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
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	) {
		return await this.projectService.deleteProject(id, userId);
	}
}
