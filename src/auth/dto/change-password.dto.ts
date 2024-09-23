import { IsPassword } from 'common/decorators/validators/is-password.decorator';

/**
 * The `ChangePasswordDto` class represents the data transfer object
 * used for changing a user's password within the application.
 *
 * This DTO encapsulates the necessary information required to
 * perform a password change operation, ensuring that both
 * the current password and the new password provided by the user
 * meet specific validation criteria.
 *
 * Validation Rules:
 * - `currentPassword`: Must adhere to defined security standards
 *   (e.g., length, complexity) as specified by the `IsPassword` decorator.
 * - `newPassword`: Must also meet the same security standards to
 *   ensure that it is strong and secure.
 */
export class ChangePasswordDto {
  @IsPassword()
  readonly currentPassword: string;

  @IsPassword()
  readonly newPassword: string;
}
