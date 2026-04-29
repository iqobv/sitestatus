import { IsOptional, IsString } from 'class-validator';

export class GeoDataDto {
	@IsString()
	@IsOptional()
	query?: string;

	@IsString()
	@IsOptional()
	countryCode?: string;

	@IsString()
	@IsOptional()
	city?: string;
}
