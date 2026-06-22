import { RegionDto } from '@api/public/region/dto/region.dto';
import { Prisma } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CACHE_EMIT_EVENTS } from '../monitor-engine/constants/emit-events.constants';
import { RegionCachePayload } from '../monitor-engine/interfaces/cache-storage.interface';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class AdminRegionService {
	constructor(
		private readonly prismaService: PgPrismaService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	public async createRegion(dto: CreateRegionDto): Promise<RegionDto> {
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
				name: region.name,
			};

			this.eventEmitter.emit(CACHE_EMIT_EVENTS.REGION.UPDATED, emitPayload);

			return region;
		} catch (error) {
			this.handlePrismaConflictError(error);

			throw error;
		}
	}

	public async getRegionByKey(key: string): Promise<RegionDto> {
		const region = await this.prismaService.region.findUnique({
			where: { key },
		});

		if (!region) {
			throw new NotFoundException(ERROR_MESSAGES.REGION.NOT_FOUND);
		}

		return region;
	}

	public async getRegionById(id: string): Promise<RegionDto> {
		const region = await this.prismaService.region.findUnique({
			where: { id },
		});

		if (!region) {
			throw new NotFoundException(ERROR_MESSAGES.REGION.NOT_FOUND);
		}

		return region;
	}

	public async updateRegion(
		id: string,
		dto: UpdateRegionDto,
	): Promise<RegionDto> {
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
				name: updatedRegion.name,
			};

			this.eventEmitter.emit(CACHE_EMIT_EVENTS.REGION.UPDATED, emitPayload);

			return updatedRegion;
		} catch (error) {
			this.handlePrismaConflictError(error);

			throw error;
		}
	}

	public async deleteRegion(id: string): Promise<MessageResponse> {
		const region = await this.getRegionById(id);

		await this.prismaService.region.delete({ where: { id: region.id } });

		this.eventEmitter.emit(CACHE_EMIT_EVENTS.REGION.DELETED, region.id);

		return SUCCESS_MESSAGES.REGION.DELETED;
	}

	private handlePrismaConflictError(error: unknown): void {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				throw new ConflictException(ERROR_MESSAGES.REGION.ALREADY_EXISTS);
			}
		}
	}
}
