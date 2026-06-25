import { Prisma } from '@generated/postgres/client';
import { Type } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from './pagination.dto';

export interface SortDataQuery<T> {
	sortBy?: T;
	sortOrder?: Prisma.SortOrder;
}

export function createDataQuery<T extends Record<string, string | number>>(
	sortObject: T,
	enumName: string,
): Type<PaginationQueryDto & SortDataQuery<T[keyof T]>> {
	class DataQueryDtoMixin extends PaginationQueryDto {
		@ApiPropertyOptional({
			enum: Object.values(sortObject),
			enumName: enumName,
		})
		@IsOptional()
		@IsEnum(sortObject)
		sortBy?: T[keyof T];

		@ApiPropertyOptional({
			example: Prisma.SortOrder.desc,
			enum: Prisma.SortOrder,
			enumName: 'SortOrder',
			default: Prisma.SortOrder.desc,
		})
		@IsOptional()
		@IsEnum(Prisma.SortOrder)
		sortOrder?: Prisma.SortOrder = Prisma.SortOrder.desc;
	}

	Object.defineProperty(DataQueryDtoMixin, 'name', {
		value: `${enumName}QueryDto`,
	});

	return DataQueryDtoMixin;
}
