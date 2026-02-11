import { IsPassword } from '@core/validators/decorators/is-password.decorator';
import { IsUsername } from '@core/validators/decorators/is-username.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    description:
      'A valid email address used for account verification and communication.',
    example: 'user@example.com'
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description:
      'The username for the new account, adhering to specified format criteria.',
    example: 'new_user123'
  })
  @IsUsername()
  readonly username: string;

  @ApiProperty({
    description: 'The password must meet the required security standards.',
    example: 'SecurePassword@1234'
  })
  @IsPassword()
  readonly password: string;
}
