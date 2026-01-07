import {
  buildMessage,
  matches,
  ValidateBy,
  ValidationOptions
} from 'class-validator';
import { USERNAME_REGEX } from '../rules/username.rules';

/**
 * The `IS_USERNAME_KEY` constant serves as a unique identifier for the `IsUsername` validation decorator.
 *
 * This key is crucial for the `class-validator` library to recognize and manage the username validation
 * logic associated with the `IsUsername` decorator. It ensures that the validation process is consistent
 * and helps prevent naming conflicts with other validation decorators within the application.
 */
const IS_USERNAME_KEY = 'isUsername';

/**
 * The `isUsername` function checks if the value matches the defined username regex.
 */
const isUsername = (value: string): boolean => matches(value, USERNAME_REGEX);

/**
 * The `IsUsername` function creates a custom validator that uses the `isUsername` function to validate the input.
 * It returns a decorator that can be applied to class properties to enforce username requirements.
 *
 * @param validationOptions Optional validation options to customize the error message or behavior.
 */
export const IsUsername = (
  validationOptions?: ValidationOptions
): PropertyDecorator => {
  return ValidateBy({
    name: IS_USERNAME_KEY,
    validator: {
      validate: (value): boolean => isUsername(value),
      defaultMessage: buildMessage(
        (eachPrefix) => `${eachPrefix}$property must be a valid username`,
        validationOptions
      )
    }
  });
};
