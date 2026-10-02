import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { IsPublic } from '@libs/decorators/is-public.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { DashboardDto } from './dto/dashboard.dto';

@ApiTags('Dashboard')
@Auth()
@IsPublic()
@Controller('dashboard')
export class DashboardController {
	constructor(private readonly dashboardService: DashboardService) {}

	/** Get dashboard data  */
	@Get()
	@ApiOkResponse({ type: DashboardDto })
	public async getDashboard(
		@Authorized('id') userId: string,
	): Promise<DashboardDto> {
		return await this.dashboardService.getDashboard(userId);
	}
}
