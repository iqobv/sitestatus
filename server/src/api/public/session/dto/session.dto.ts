import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose } from 'class-transformer';

export class SessionDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() expiresAt: Date;
	@Expose() ip: string | null;
	@Expose() countryCode: string | null;
	@Expose() city: string | null;
	@Expose() browser: string | null;
	@Expose() os: string | null;
	@Expose() device: string | null;
}
