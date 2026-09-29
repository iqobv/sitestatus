import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { IsPublic } from '@libs/decorators/is-public.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
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
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { PaginatedProjectsDto } from './dto/paginated-projects.dto';
import { ProjectDto, ProjectWithMonitorsDto } from './dto/project.dto';
import { ProjectsQueryDto } from './dto/projects-query.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@Auth()
@IsPublic()
@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	/** Create a new project */
	@Post()
	@ApiOkResponse({ type: ProjectDto })
	@ApiErrorResponse(HttpStatus.CONFLICT, ERROR_MESSAGES.PROJECT.SLUG_EXISTS)
	public async createProject(
		@Body() dto: CreateProjectDto,
		@Authorized('id') userId: string,
	): Promise<ProjectDto> {
		return await this.projectService.createProject(dto, userId);
	}

	/** Get a project by ID */
	@Get('id/:id')
	@ApiOkResponse({ type: ProjectDto })
	@ApiErrorResponse(HttpStatus.CONFLICT, ERROR_MESSAGES.PROJECT.NOT_FOUND)
	public async getProjectById(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	): Promise<ProjectDto> {
		return await this.projectService.getProjectById(id, userId);
	}

	/** Get all projects */
	@Get()
	@ApiOkResponse({ type: PaginatedProjectsDto })
	public async getAllProjects(
		@Authorized('id') userId: string,
		@Query() query: ProjectsQueryDto,
	): Promise<PaginatedProjectsDto> {
		return await this.projectService.getAllProjects(userId, query);
	}

	/** Get all projects with monitors */
	@Get('with-monitors')
	@ApiOkResponse({ type: [ProjectWithMonitorsDto] })
	public async getAllProjectsWithMonitors(
		@Authorized('id') userId: string,
	): Promise<ProjectWithMonitorsDto[]> {
		return await this.projectService.getAllProjectsWithMonitors(userId);
	}

	/** Update a project */
	@Patch(':id')
	@ApiOkResponse({ type: ProjectDto })
	@ApiErrorResponse(
		HttpStatus.CONFLICT,
		withField(ERROR_MESSAGES.PROJECT.SLUG_EXISTS, 'slug'),
	)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PROJECT.NOT_FOUND)
	public async updateProject(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
		@Body() dto: UpdateProjectDto,
	): Promise<ProjectDto> {
		return await this.projectService.updateProject(id, userId, dto);
	}

	/** Delete a project */
	@Delete(':id')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.PROJECT.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PROJECT.NOT_FOUND)
	public async deleteProject(
		@Param('id', ParseUUIDPipe) id: string,
		@Authorized('id') userId: string,
	): Promise<MessageResponse> {
		return await this.projectService.deleteProject(id, userId);
	}
}
