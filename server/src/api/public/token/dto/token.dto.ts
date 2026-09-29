import { UserWithoutPasswordDto } from '@api/public/user/dto/user.dto';
import { NotificationChannel } from '@generated/postgres/client';

export class VerifyTokenDto extends UserWithoutPasswordDto {
	channel: NotificationChannel | null;
}
