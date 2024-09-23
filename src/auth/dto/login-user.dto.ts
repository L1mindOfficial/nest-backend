import { IsNotEmpty, IsString } from 'class-validator';
import { IsPassword } from 'common/decorators/validators/is-password.decorator';

/**
 * The `LoginUserDto` class defines the data transfer object
 * for handling user login requests in the application.
 *
 * It captures the essential credentials needed for a user to
 * authenticate themselves and grants access to their account.
 *
 * Validation Rules:
 * - `email`: Must be a non-empty string, indicating that the user
 *   has provided either their email address or username. This
 *   flexibility allows users to log in with either credential.
 * - `password`: Must meet predefined security standards as dictated
 *   by the `IsPassword` decorator, ensuring that the user provides a
 *   strong password for authentication.
 */
export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsPassword()
  readonly password: string;
}
