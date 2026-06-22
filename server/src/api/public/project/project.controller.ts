import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { IsPublic } from '@libs/decorators/is-public.decorator';
import { withField } from '@libs/utils/error-with-field.util';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDto, ProjectWithMonitorsDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@Auth()
@IsPublic()
@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@ApiOperation({
		summary: 'Create a new project',
		description: 'Creates a new project with the provided details',
	})
	@ApiOkResponse({ type: ProjectDto })
	@ApiErrorResponse(HttpStatus.CONFLICT, ERROR_MESSAGES.PROJECT.SLUG_EXISTS)
	@Post()
	async createProject(
		@Body() dto: CreateProjectDto,
		@Authorized('id') userId: string,
	) {
		return await this.projectService.createProject(dto, userId);
	}

	@ApiOperation({
		summary: 'Get project by ID',
		description: 'Retrieves a project by its unique identifier',
	})
	@ApiOkResponse({ type: ProjectDto })
	@ApiErrorResponse(HttpStatus.CONFLICT, ERROR_MESSAGES.PROJECT.NOT_FOUND)
	@Get('id/:id')
	async getProjectById(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	) {
		return await this.projectService.getProjectById(id, userId);
	}

	@ApiOperation({
		summary: 'Get all projects',
		description: 'Retrieves a list of all projects',
	})
	@ApiOkResponse({ type: [ProjectDto] })
	@Get()
	async getAllProjects(@Authorized('id') userId: string) {
		return await this.projectService.getAllProjects(userId);
	}

	@ApiOperation({
		summary: 'Get all projects with monitors',
	})
	@ApiOkResponse({
		type: [ProjectWithMonitorsDto],
	})
	@Get('with-monitors')
	async getAllProjectsWithMonitors(@Authorized('id') userId: string) {
		return await this.projectService.getAllProjectsWithMonitors(userId);
	}

	@ApiOperation({
		summary: 'Update a project',
		description: 'Updates a project with the provided details',
	})
	@ApiOkResponse({ type: ProjectDto })
	@ApiErrorResponse(
		HttpStatus.CONFLICT,
		withField(ERROR_MESSAGES.PROJECT.SLUG_EXISTS, 'slug'),
	)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PROJECT.NOT_FOUND)
	@Patch(':id')
	async updateProject(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
		@Body() dto: UpdateProjectDto,
	) {
		return await this.projectService.updateProject(id, userId, dto);
	}

	@ApiOperation({
		summary: 'Delete a project',
		description: 'Deletes a project with the provided details',
	})
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.PROJECT.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PROJECT.NOT_FOUND)
	@Delete(':id')
	async deleteProject(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	) {
		return await this.projectService.deleteProject(id, userId);
	}
}
