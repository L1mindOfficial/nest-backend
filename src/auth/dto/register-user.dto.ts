import { IsEmail } from 'class-validator';
import { IsPassword } from 'common/decorators/validators/is-password.decorator';
import { IsUsername } from 'common/decorators/validators/is-username.decorator';

/**
 * The `RegisterUserDto` class is utilized for user registration
 * requests within the application.
 *
 * It collects the necessary information required for creating a
 * new user account, enforcing validation to ensure data integrity
 * and security.
 *
 * Validation Rules:
 * - `email`: Must be a valid email format, ensuring that the
 *   user provides a correctly formatted email address for account
 *   verification and communication.
 * - `username`: Must meet specific criteria defined by the
 *   `IsUsername` decorator, which typically includes length and
 *   character restrictions to ensure a valid username.
 * - `password`: Must comply with robust security standards enforced
 *   by the `IsPassword` decorator, ensuring that the password is
 *   sufficiently strong to protect the user account.
 */
export class RegisterUserDto {
  @IsEmail()
  readonly email: string;

  @IsUsername()
  readonly username: string;

  @IsPassword()
  readonly password: string;
}
