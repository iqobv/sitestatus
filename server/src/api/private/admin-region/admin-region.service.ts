import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'src/libs/constants';
import { CreateRegionDto, UpdateRegionDto } from './dto';

@Injectable()
export class AdminRegionService {
	constructor(private readonly prismaService: PrismaService) {}

	async createRegion(dto: CreateRegionDto) {
		const { key, name, continent, isActive = true, longitude, latitude } = dto;

		try {
			return await this.prismaService.region.create({
				data: {
					key: key.toLowerCase(),
					name,
					continent,
					isActive,
					longitude,
					latitude,
				},
			});
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
			return await this.prismaService.region.update({
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
		} catch (error) {
			this.throwConflictException(error);
		}
	}

	async deleteRegion(id: string) {
		const region = await this.getRegionById(id);

		await this.prismaService.region.delete({ where: { id: region.id } });

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
