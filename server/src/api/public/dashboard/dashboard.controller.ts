import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { IsPublic } from '@libs/decorators/is-public.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { DashboardDto } from './dto/dashboard.dto';

@ApiTags('Dashboard')
@Auth()
@IsPublic()
@Controller('dashboard')
export class DashboardController {
	constructor(private readonly dashboardService: DashboardService) {}

	@ApiOperation({ summary: 'Get dashboard data' })
	@ApiOkResponse({ type: DashboardDto })
	@Get()
	public async getDashboard(
		@Authorized('id') userId: string,
	): Promise<DashboardDto> {
		return await this.dashboardService.getDashboard(userId);
	}
}
