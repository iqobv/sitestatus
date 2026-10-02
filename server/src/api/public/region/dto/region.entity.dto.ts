import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose } from 'class-transformer';

export class RegionEntityDto extends DefaultFieldsDto {
	@Expose() key: string;
	@Expose() name: string;
	@Expose() continent: string | null;
	@Expose() isActive: boolean;
	@Expose() longitude: number | null;
	@Expose() latitude: number | null;
	@Expose() deletedAt: Date | null;
}
