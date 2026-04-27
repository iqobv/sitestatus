import { Prisma } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CACHE_EMIT_EVENTS } from '../monitor-engine/constants';
import { RegionCachePayload } from '../monitor-engine/interfaces';
import { CreateRegionDto, UpdateRegionDto } from './dto';

@Injectable()
export class AdminRegionService {
	constructor(
		private readonly prismaService: PgPrismaService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	async createRegion(dto: CreateRegionDto) {
		const { key, name, continent, isActive = true, longitude, latitude } = dto;

		try {
			const region = await this.prismaService.region.create({
				data: {
					key: key.toLowerCase(),
					name,
					continent,
					isActive,
					longitude,
					latitude,
				},
			});

			const emitPayload: RegionCachePayload = {
				id: region.id,
				key: region.key,
				isActive: region.isActive,
			};

			this.eventEmitter.emit(CACHE_EMIT_EVENTS.REGION.UPDATED, emitPayload);

			return region;
		} catch (error) {
			this.throwConflictException(error);
		}
	}

	async getRegionByKey(key: string) {
		const region = await this.prismaService.region.findUnique({
			where: { key },
		});

		if (!region) {
			throw new NotFoundException(ERROR_MESSAGES.REGION.REGION_NOT_FOUND);
		}

		return region;
	}

	async getRegionById(id: string) {
		const region = await this.prismaService.region.findUnique({
			where: { id },
		});

		if (!region) {
			throw new NotFoundException(ERROR_MESSAGES.REGION.REGION_NOT_FOUND);
		}

		return region;
	}

	async updateRegion(id: string, dto: UpdateRegionDto) {
		const { key, name, continent, isActive, longitude, latitude } = dto;

		const region = await this.getRegionById(id);

		try {
			const updatedRegion = await this.prismaService.region.update({
				where: { id: region.id },
				data: {
					...(key && { key: key.toLowerCase() }),
					name,
					continent,
					isActive,
					longitude,
					latitude,
				},
			});

			const emitPayload: RegionCachePayload = {
				id: updatedRegion.id,
				key: updatedRegion.key,
				isActive: updatedRegion.isActive,
			};

			this.eventEmitter.emit(CACHE_EMIT_EVENTS.REGION.UPDATED, emitPayload);

			return updatedRegion;
		} catch (error) {
			this.throwConflictException(error);
		}
	}

	async deleteRegion(id: string) {
		const region = await this.getRegionById(id);

		await this.prismaService.region.delete({ where: { id: region.id } });

		this.eventEmitter.emit(CACHE_EMIT_EVENTS.REGION.DELETED, region.id);

		return SUCCESS_MESSAGES.REGION.REGION_DELETED;
	}

	private throwConflictException(error: unknown) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				throw new ConflictException(
					ERROR_MESSAGES.REGION.REGION_ALREADY_EXISTS,
				);
			}
		}
	}
}
