import { Expose } from 'class-transformer';

export class DefaultFieldsDto {
	@Expose() id: string;
	@Expose() createdAt: Date;
	@Expose() updatedAt: Date;
}
