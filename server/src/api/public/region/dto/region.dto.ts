import { PickType } from '@nestjs/swagger';
import { RegionEntityDto } from './region.entity.dto';

export class BaseRegionDto extends PickType(RegionEntityDto, ['key', 'name']) {}
export class RegionDto extends RegionEntityDto {}
