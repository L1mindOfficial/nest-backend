import { IsPassword } from '@core/validators/decorators/is-password.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description:
      'The email address or username of the user, must be a non-empty string.',
    example: 'user@example.com'
  })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({
    description:
      'The password must meet security standards enforced by the application.',
    example: 'SecurePassword@1234'
  })
  @IsPassword()
  readonly password: string;
}
