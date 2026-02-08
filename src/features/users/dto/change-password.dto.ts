import { ApiProperty } from '@nestjs/swagger';
import { IsPassword } from 'core/validators/decorators/is-password.decorator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'The current password must meet security standards.',
    example: 'StrongPassword@1234'
  })
  @IsPassword()
  readonly currentPassword: string;

  @ApiProperty({
    description: 'The new password must also meet security standards.',
    example: 'NewStrongPassword@5678'
  })
  @IsPassword()
  readonly newPassword: string;
}
